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

function prettifyTag(tag) {
  return String(tag || "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}

export default async function handler(req, res) {
  try {
    const rawTag = String(
      req.query.tag || ""
    ).trim();

    if (!rawTag) {
      return res.status(400).send(
        "Missing tag"
      );
    }

    const tagResponse = await fetch(
      `${BACKEND_URL}/api/seo/tags/${encodeURIComponent(
        rawTag
      )}`
    );

    if (!tagResponse.ok) {
      if (tagResponse.status === 404) {
        return res.status(404).send(
          "Tag not found"
        );
      }

      throw new Error(
        `DYOP tag API failed: ${tagResponse.status}`
      );
    }

    const tagData =
      await tagResponse.json();

    const tag = tagData.tag || rawTag;
    const displayTag = prettifyTag(tag);

    const canonicalUrl =
      `${SITE_URL}/tag/${encodeURIComponent(
        tag.toLowerCase()
      )}`;

    const title =
      `${displayTag} Videos | DYOP`;

    const description =
      `Watch ${displayTag} videos on DYOP. ` +
      `Discover AI-generated videos, creators ` +
      `and new content tagged ${displayTag}.`;

    const indexResponse =
      await fetch(`${SITE_URL}/`);

    if (!indexResponse.ok) {
      throw new Error(
        `Could not load DYOP index.html: ${indexResponse.status}`
      );
    }

    let html =
      await indexResponse.text();

    // Remove generic page metadata.

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

    html = html.replace(
      /<meta\s+property=["']og:[^"']+["'][^>]*>/gi,
      ""
    );

    html = html.replace(
      /<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi,
      ""
    );

    const metadata = `
    <!-- DYOP TAG SEO -->

    <title>${escapeHtml(title)}</title>

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

    <meta
      property="og:title"
      content="${escapeHtml(title)}"
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
      content="website"
    />

    <meta
      property="og:site_name"
      content="DYOP"
    />

    <meta
      name="twitter:card"
      content="summary"
    />

    <meta
      name="twitter:title"
      content="${escapeHtml(title)}"
    />

    <meta
      name="twitter:description"
      content="${escapeHtml(description)}"
    />

    <!-- END DYOP TAG SEO -->
    `;

    if (!html.includes("</head>")) {
      throw new Error(
        "Could not find </head> in DYOP index.html"
      );
    }

    html = html.replace(
      "</head>",
      `${metadata}\n</head>`
    );

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
    console.error(
      "tag_preview failed:",
      error
    );

    return res
      .status(500)
      .send(
        "Unable to generate tag preview"
      );
  }
}