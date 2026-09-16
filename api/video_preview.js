const BACKEND_URL = "https://api.dyop.ai";
const SITE_URL = "https://www.dyop.ai";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function truncate(value = "", max = 200) {
  const text = String(value).trim();

  if (text.length <= max) return text;

  return `${text.slice(0, max - 1).trim()}…`;
}

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).send("Missing video ID");
    }

    // ---------------------------------------------------------
    // 1. Get the video from the existing DYOP backend
    // ---------------------------------------------------------

    const videoResponse = await fetch(
    `${BACKEND_URL}/api/videos/${encodeURIComponent(id)}/metadata`
    );

    if (!videoResponse.ok) {
    const errorBody = await videoResponse.text();

    console.error(
        "DYOP API video request failed:",
        videoResponse.status,
        videoResponse.statusText,
        errorBody
    );

    return res.status(videoResponse.status).json({
        error: "Backend rejected video request",
        backendStatus: videoResponse.status,
        backendStatusText: videoResponse.statusText,
        backendResponse: errorBody
    });
    }

    const video = await videoResponse.json();

    // ---------------------------------------------------------
    // 2. Only generate indexable previews for public videos
    // ---------------------------------------------------------

    const isPublic =
      !video.visibility ||
      String(video.visibility).toLowerCase() === "public";

    if (!isPublic) {
      return res.status(404).send("Video not found");
    }

    // ---------------------------------------------------------
    // 3. Build metadata
    // ---------------------------------------------------------

    const videoTitle =
      String(video.title || "").trim() || "Video";

    const pageTitle = `${videoTitle} | DYOP`;

    const creator =
      video.channelDisplayName ||
      video.channelUsername ||
      video.username ||
      "";

    const description = truncate(
      String(video.description || "").trim() ||
        (creator
          ? `Watch ${videoTitle} by ${creator} on DYOP.`
          : `Watch ${videoTitle} on DYOP.`),
      200
    );

    const canonicalUrl =
      `${SITE_URL}/watch/${encodeURIComponent(id)}`;

    const thumbnail =
      video.thumbUrl ||
      video.thumb ||
      "";

    // ---------------------------------------------------------
    // 4. Get DYOP's actual deployed Vite HTML
    // ---------------------------------------------------------

    const indexResponse = await fetch(`${SITE_URL}/`);

    if (!indexResponse.ok) {
      throw new Error(
        `Could not load DYOP index.html: ${indexResponse.status}`
      );
    }

    let html = await indexResponse.text();

    // ---------------------------------------------------------
    // 5. Remove generic metadata from index.html
    // ---------------------------------------------------------

    html = html.replace(
      /<title>[\s\S]*?<\/title>/i,
      ""
    );

    html = html.replace(
      /<meta\s+name=["']description["'][^>]*>/gi,
      ""
    );

    html = html.replace(
      /<meta\s+name=["']robots["'][^>]*>/gi,
      ""
    );

    html = html.replace(
      /<link\s+rel=["']canonical["'][^>]*>/gi,
      ""
    );

    // Remove existing OG/Twitter metadata if we add any
    // globally to index.html later.
    html = html.replace(
      /<meta\s+property=["']og:[^"']+["'][^>]*>/gi,
      ""
    );

    html = html.replace(
      /<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi,
      ""
    );

    // ---------------------------------------------------------
    // 6. Generate video-specific metadata
    // ---------------------------------------------------------

    const metadata = `
    <!-- DYOP VIDEO SEO -->

    <title>${escapeHtml(pageTitle)}</title>

    <meta
      name="description"
      content="${escapeHtml(description)}"
    />

    <meta
      name="robots"
      content="index, follow"
    />

    <link
      rel="canonical"
      href="${escapeHtml(canonicalUrl)}"
    />

    <!-- Open Graph -->

    <meta
      property="og:title"
      content="${escapeHtml(pageTitle)}"
    />

    <meta
      property="og:description"
      content="${escapeHtml(description)}"
    />

    <meta
      property="og:url"
      content="${escapeHtml(canonicalUrl)}"
    />

    <meta
      property="og:type"
      content="video.other"
    />

    <meta
      property="og:site_name"
      content="DYOP"
    />

    ${
      thumbnail
        ? `<meta
      property="og:image"
      content="${escapeHtml(thumbnail)}"
    />`
        : ""
    }

    <!-- X / Twitter -->

    <meta
      name="twitter:card"
      content="summary_large_image"
    />

    <meta
      name="twitter:title"
      content="${escapeHtml(pageTitle)}"
    />

    <meta
      name="twitter:description"
      content="${escapeHtml(description)}"
    />

    ${
      thumbnail
        ? `<meta
      name="twitter:image"
      content="${escapeHtml(thumbnail)}"
    />`
        : ""
    }

    <!-- END DYOP VIDEO SEO -->
`;

    // ---------------------------------------------------------
    // 7. Inject metadata into <head>
    // ---------------------------------------------------------

    if (!html.includes("</head>")) {
      throw new Error(
        "Could not find </head> in deployed DYOP index.html"
      );
    }

    html = html.replace(
      "</head>",
      `${metadata}\n</head>`
    );

    // ---------------------------------------------------------
    // 8. Return complete React application
    // ---------------------------------------------------------

    res.setHeader(
      "Content-Type",
      "text/html; charset=utf-8"
    );

    res.setHeader(
      "Cache-Control",
      "public, max-age=0, s-maxage=300"
    );

    return res.status(200).send(html);
  } catch (error) {
    console.error("video_preview failed:", error);

    return res
      .status(500)
      .send("Unable to generate video preview");
  }
}