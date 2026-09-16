const BACKEND_URL = "https://api.dyop.ai";
const SITE_URL = "https://dyop.ai";

/**
 * Escape text before inserting it into HTML attributes/elements.
 * Video titles and descriptions are user-generated, so this is important.
 */
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
    // We'll pass the video ID in through Vercel:
    // /api/video-preview?id=VIDEO_ID
    const { id } = req.query;

    if (!id) {
      return res.status(400).send("Missing video ID");
    }

    // ---------------------------------------------------------
    // 1. Get video information from the existing DYOP API
    // ---------------------------------------------------------

    const videoResponse = await fetch(
      `${BACKEND_URL}/api/videos/${encodeURIComponent(id)}`
    );

    if (!videoResponse.ok) {
      return res.status(videoResponse.status).send("Video not found");
    }

    const video = await videoResponse.json();

    // ---------------------------------------------------------
    // 2. Only expose public videos to crawlers
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

    const videoTitle = video.title?.trim() || "Video";

    const pageTitle = `${videoTitle} | DYOP`;

    const creator =
      video.channelDisplayName ||
      video.channelUsername ||
      video.username ||
      "";

    const description = truncate(
      video.description?.trim() ||
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
    // 4. Get the normal DYOP index.html from Vercel
    // ---------------------------------------------------------

    const indexResponse = await fetch(`${SITE_URL}/`);

    if (!indexResponse.ok) {
      throw new Error(
        `Could not load DYOP index.html: ${indexResponse.status}`
      );
    }

    let html = await indexResponse.text();

    // ---------------------------------------------------------
    // 5. Generate server-rendered metadata
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
          ? `
      <meta
        property="og:image"
        content="${escapeHtml(thumbnail)}"
      />
      `
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
          ? `
      <meta
        name="twitter:image"
        content="${escapeHtml(thumbnail)}"
      />
      `
          : ""
      }

      <!-- END DYOP VIDEO SEO -->
    `;

    // ---------------------------------------------------------
    // 6. Remove generic metadata that would conflict
    // ---------------------------------------------------------

    html = html.replace(/<title>[\s\S]*?<\/title>/i, "");

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

    // ---------------------------------------------------------
    // 7. Inject metadata before </head>
    // ---------------------------------------------------------

    html = html.replace(
      "</head>",
      `${metadata}\n</head>`
    );

    // ---------------------------------------------------------
    // 8. Return the complete React page
    // ---------------------------------------------------------

    res.setHeader(
      "Content-Type",
      "text/html; charset=utf-8"
    );

    // Don't let preview metadata get stuck forever.
    res.setHeader(
      "Cache-Control",
      "public, max-age=0, s-maxage=300"
    );

    return res.status(200).send(html);
  } catch (error) {
    console.error("video-preview failed:", error);

    return res
      .status(500)
      .send("Unable to generate video preview");
  }
}