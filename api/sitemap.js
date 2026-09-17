const BACKEND_URL = "https://api.dyop.ai";
const SITE_URL = "https://www.dyop.ai";

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatDate(value) {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

export default async function handler(req, res) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/seo/sitemap`
    );

    if (!response.ok) {
      throw new Error(
        `DYOP sitemap API failed: ${response.status}`
      );
    }

    const data = await response.json();

    const videos = Array.isArray(data.videos)
      ? data.videos
      : [];

    // ---------------------------------------------------------
    // Video URLs
    // ---------------------------------------------------------

    const videoUrls = videos
      .filter((video) => video?.id)
      .map((video) => {
        const url =
          `${SITE_URL}/watch/${encodeURIComponent(video.id)}`;

        const lastModified = formatDate(video.updatedAt);

        return `
  <url>
    <loc>${escapeXml(url)}</loc>
    ${
      lastModified
        ? `<lastmod>${escapeXml(lastModified)}</lastmod>`
        : ""
    }
  </url>`;
      });

    // ---------------------------------------------------------
    // Creator URLs
    //
    // Set removes duplicates because one creator may have
    // hundreds of videos.
    // ---------------------------------------------------------

    const usernames = [
      ...new Set(
        videos
          .map((video) => video.username)
          .filter(Boolean)
      ),
    ];

    const creatorUrls = usernames.map((username) => {
      const url =
        `${SITE_URL}/u/${encodeURIComponent(username)}`;

      return `
  <url>
    <loc>${escapeXml(url)}</loc>
  </url>`;
    });

    // ---------------------------------------------------------
    // Static public DYOP pages
    // ---------------------------------------------------------

    const staticUrls = [
      `
  <url>
    <loc>${SITE_URL}/</loc>
  </url>`,
    ];

    // ---------------------------------------------------------
    // Generate XML
    // ---------------------------------------------------------

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${[
  ...staticUrls,
  ...creatorUrls,
  ...videoUrls,
].join("\n")}
</urlset>`;

    res.setHeader(
      "Content-Type",
      "application/xml; charset=utf-8"
    );

    // Cache on Vercel for 10 minutes.
    res.setHeader(
      "Cache-Control",
      "public, max-age=0, s-maxage=600"
    );

    return res.status(200).send(xml);
  } catch (error) {
    console.error("sitemap generation failed:", error);

    return res
      .status(500)
      .send("Unable to generate sitemap");
  }
}