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

function toIsoDuration(seconds) {
  const total = Math.max(0, Math.floor(Number(seconds) || 0));

  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  let duration = "PT";

  if (hours) duration += `${hours}H`;
  if (minutes) duration += `${minutes}M`;
  if (secs || (!hours && !minutes)) duration += `${secs}S`;

  return duration;
}

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).send("Missing video ID");
    }

    // ---------------------------------------------------------
    // 1. Get PUBLIC video metadata from the DYOP backend
    // ---------------------------------------------------------

    const videoResponse = await fetch(
      `${BACKEND_URL}/api/videos/${encodeURIComponent(id)}/metadata`
    );

    if (!videoResponse.ok) {
      const errorBody = await videoResponse.text();

      console.error(
        "DYOP API video metadata request failed:",
        videoResponse.status,
        videoResponse.statusText,
        errorBody
      );

      return res.status(videoResponse.status).send("Video not found");
    }

    const video = await videoResponse.json();

    // ---------------------------------------------------------
    // 2. Double-check this is a public video
    // ---------------------------------------------------------

    const isPublic =
      !video.visibility ||
      String(video.visibility).toLowerCase() === "public";

    const isPublicAsset =
      !video.assetScope ||
      String(video.assetScope).toLowerCase() === "public";

    if (!isPublic || !isPublicAsset) {
      return res.status(404).send("Video not found");
    }

    // ---------------------------------------------------------
    // 3. Build page metadata
    // ---------------------------------------------------------

    const videoTitle =
      String(video.title || "").trim() || "Video";

    const pageTitle = `${videoTitle} | DYOP`;

    const creator =
      video.channelDisplayName ||
      video.channelUsername ||
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
    // 4. Build Schema.org VideoObject structured data
    // ---------------------------------------------------------

    const videoObject = {
      "@context": "https://schema.org",
      "@type": "VideoObject",

      name: videoTitle,
      description,

      thumbnailUrl: thumbnail
        ? [thumbnail]
        : undefined,

      uploadDate:
        video.createdAt ||
        undefined,

      duration:
        video.durationSeconds != null
          ? toIsoDuration(video.durationSeconds)
          : undefined,

      url: canonicalUrl,

      author: creator
        ? {
            "@type": "Person",
            name: creator,
            url: video.channelUsername
              ? `${SITE_URL}/u/${encodeURIComponent(
                  video.channelUsername
                )}`
              : undefined,
          }
        : undefined,
    };

    // JSON.stringify automatically removes undefined object fields.
    // Replacing "<" prevents user-generated text from prematurely
    // closing the JSON-LD <script> element.
    const videoObjectJson = JSON.stringify(videoObject)
      .replace(/</g, "\\u003c");

    // ---------------------------------------------------------
    // 5. Get DYOP's actual deployed Vite HTML
    // ---------------------------------------------------------

    const indexResponse = await fetch(`${SITE_URL}/`);

    if (!indexResponse.ok) {
      throw new Error(
        `Could not load DYOP index.html: ${indexResponse.status}`
      );
    }

    let html = await indexResponse.text();

    // ---------------------------------------------------------
    // 6. Remove generic metadata from index.html
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

    // Remove existing Open Graph metadata if global OG tags
    // are added to index.html in the future.
    html = html.replace(
      /<meta\s+property=["']og:[^"']+["'][^>]*>/gi,
      ""
    );

    // Remove existing Twitter/X metadata.
    html = html.replace(
      /<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi,
      ""
    );

    // Remove an existing VideoObject if one is ever placed
    // into the global index.html.
    html = html.replace(
      /<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
      ""
    );

    // ---------------------------------------------------------
    // 7. Generate video-specific metadata
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

    <!-- Schema.org VideoObject -->

    <script type="application/ld+json">
      ${videoObjectJson}
    </script>

    <!-- END DYOP VIDEO SEO -->
`;

    // ---------------------------------------------------------
    // 8. Inject metadata into <head>
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
    // 9. Return the complete React application
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