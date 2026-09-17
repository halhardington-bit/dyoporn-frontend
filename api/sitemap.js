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

function normalizeTag(tag) {
  return String(tag || "")
    .trim()
    .toLowerCase();
}

export default async function handler(req, res) {
  try {
    // -----------------------------------------
    // FETCH PUBLIC VIDEO DATA
    // -----------------------------------------

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

    // -----------------------------------------
    // STATIC URLS
    //
    // Add future SEO / landing pages here.
    // -----------------------------------------

    const staticPaths = [
      "/",

      // AI video
      "/ai-video-generator",
      "/free-ai-video-generator",
      "/ai-video-maker",
      "/ai-video-software",
      "/ai-video-for-pc",
      "/generative-ai-video",

      // Video generation methods
      "/text-to-video",
      "/image-to-video",
      "/ai-animation-generator",

      // Characters / consistency
      "/ai-character-generator",
      "/consistent-ai-generation",

      // Music
      "/ai-music-video-generator",

      // Local / offline
      "/local-ai-video-generator",
      "/offline-ai-video-generator",

      // Free AI
      "/free-ai-tools",
      "/free-ai-content-creation",
      "/ai-without-subscription",

      // All-in-one creation
      "/all-in-one-ai-generator",
      "/ai-creative-suite",

      // Community / discovery
      "/ai-video-community",
      "/watch-ai-videos",

      // Guides
      "/how-to-make-ai-videos",
    ];

    const staticUrls = staticPaths.map((path) => {
      const url = `${SITE_URL}${path}`;

      return `
  <url>
    <loc>${escapeXml(url)}</loc>
  </url>`;
    });

    // -----------------------------------------
    // VIDEO URLS
    // -----------------------------------------

    const videoUrls = videos
      .filter((video) => video?.id)
      .map((video) => {
        const url =
          `${SITE_URL}/watch/${encodeURIComponent(
            video.id
          )}`;

        const lastModified =
          formatDate(video.updatedAt);

        return `
  <url>
    <loc>${escapeXml(url)}</loc>
    ${
      lastModified
        ? `<lastmod>${escapeXml(
            lastModified
          )}</lastmod>`
        : ""
    }
  </url>`;
      });

    // -----------------------------------------
    // CREATOR URLS
    // -----------------------------------------

    const usernames = [
      ...new Set(
        videos
          .map((video) => video.username)
          .filter(Boolean)
      ),
    ];

    const creatorUrls = usernames.map(
      (username) => {
        const url =
          `${SITE_URL}/u/${encodeURIComponent(
            username
          )}`;

        return `
  <url>
    <loc>${escapeXml(url)}</loc>
  </url>`;
      }
    );

    // -----------------------------------------
    // TAG URLS
    // -----------------------------------------

    const tagMap = new Map();

    for (const video of videos) {
      const tags = Array.isArray(video.tags)
        ? video.tags
        : [];

      for (const rawTag of tags) {
        const tag = normalizeTag(rawTag);

        if (!tag) continue;

        if (!tagMap.has(tag)) {
          tagMap.set(tag, {
            tag,
            updatedAt: video.updatedAt || null,
          });

          continue;
        }

        // Keep the newest video update date
        // as the collection's <lastmod>.

        const existing = tagMap.get(tag);

        const existingDate =
          existing.updatedAt
            ? new Date(existing.updatedAt)
            : null;

        const candidateDate =
          video.updatedAt
            ? new Date(video.updatedAt)
            : null;

        if (
          candidateDate &&
          !Number.isNaN(candidateDate.getTime()) &&
          (
            !existingDate ||
            Number.isNaN(existingDate.getTime()) ||
            candidateDate > existingDate
          )
        ) {
          existing.updatedAt =
            video.updatedAt;
        }
      }
    }

    const tagUrls = [
      ...tagMap.values(),
    ].map(({ tag, updatedAt }) => {
      const url =
        `${SITE_URL}/tag/${encodeURIComponent(
          tag
        )}`;

      const lastModified =
        formatDate(updatedAt);

      return `
  <url>
    <loc>${escapeXml(url)}</loc>
    ${
      lastModified
        ? `<lastmod>${escapeXml(
            lastModified
          )}</lastmod>`
        : ""
    }
  </url>`;
    });

    // -----------------------------------------
    // COMBINE ALL URLS
    // -----------------------------------------

    const allUrls = [
      ...staticUrls,
      ...creatorUrls,
      ...tagUrls,
      ...videoUrls,
    ];

    // -----------------------------------------
    // XML
    // -----------------------------------------

    const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${allUrls.join("\n")}
</urlset>`;

    // -----------------------------------------
    // RESPONSE
    // -----------------------------------------

    res.setHeader(
      "Content-Type",
      "application/xml; charset=utf-8"
    );

    res.setHeader(
      "Cache-Control",
      "public, max-age=0, s-maxage=600"
    );

    return res
      .status(200)
      .send(xml);

  } catch (error) {
    console.error(
      "sitemap generation failed:",
      error
    );

    return res
      .status(500)
      .send("Unable to generate sitemap");
  }
}