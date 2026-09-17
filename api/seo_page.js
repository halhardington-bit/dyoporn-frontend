const SITE_URL = "https://www.dyop.ai";

const pages = {
  "ai-video-generator": {
    title:
      "AI Video Generator | Create AI Videos with DYOP",

    description:
      "Create AI-generated videos with DYOP. Turn your ideas into video, explore AI creations from other creators, and publish your own videos.",

    canonical: "/ai-video-generator",
  },

  "image-to-video": {
  title:
    "Image to Video AI | Turn Images into Videos with DYOP",

  description:
    "Turn images into AI-generated videos with DYOP. Animate still images, add movement and create video from your artwork, photos or AI images.",

  canonical: "/image-to-video",
},

  "text-to-video": {
    title:
      "Text to Video AI | Create Videos from Text with DYOP",

    description:
      "Create AI videos from text with DYOP. Describe a scene, turn your prompt into video, and publish your AI-generated creation.",

    canonical: "/text-to-video",
  },

  "ai-video-community": {
    title:
      "AI Video Community | Create, Watch & Share AI Videos | DYOP",

    description:
      "Join an AI video community built for creators and viewers. Create, publish, watch and discover AI-generated videos on DYOP.",

    canonical:
      "/ai-video-community",
  },

  "watch-ai-videos": {
    title:
      "Watch AI Videos | Discover AI-Generated Videos on DYOP",

    description:
      "Watch AI-generated videos on DYOP. Discover videos, creators and new generative content from the AI video community.",

    canonical:
      "/watch-ai-videos",
  },

  "ai-video-maker": {
    title:
      "AI Video Maker | Create & Publish AI Videos with DYOP",

    description:
      "Make AI-generated videos with DYOP. Turn ideas, text and images into video, develop your creation and publish it for others to discover.",

    canonical:
      "/ai-video-maker",
  },

  "ai-animation-generator": {
    title:
      "AI Animation Generator | Create AI Animated Videos | DYOP",

    description:
      "Create AI-generated animation with DYOP. Animate characters, artwork, images and imaginative scenes, then publish your animated videos.",

    canonical:
      "/ai-animation-generator",
  },

  "free-ai-video-generator": {
    title:
      "Free AI Video Generator | Create AI Videos Free | DYOP",

    description:
      "Create AI-generated videos for free with DYOP. Generate videos from your ideas, publish your creations and discover AI videos from other creators.",

    canonical:
      "/free-ai-video-generator",
  },

  "offline-ai-video-generator": {
    title:
      "Offline AI Video Generator | Create AI Videos Locally | DYOP",

    description:
      "Create AI videos locally with DYOP. Use supported AI generation workflows on your own computer for characters, images, video and music, then edit everything in one application.",

    canonical:
      "/offline-ai-video-generator",
  },

  "ai-character-generator": {
    title:
      "AI Character Generator | Create Characters for AI Video | DYOP",

    description:
      "Create AI characters with DYOP. Design characters for images, animation and AI video, then bring them into your complete video creation workflow.",

    canonical:
      "/ai-character- generator",
  },

  "how-to-make-ai-videos": {
    title:
      "How to Make AI Videos | Step-by-Step Guide | DYOP",

    description:
      "Learn how to make AI videos step by step. Create characters, generate images, turn them into video, create music and edit everything into a finished AI video.",

    canonical:
      "/how-to-make-ai-videos",
  },

  "ai-video-for-pc": {
    title:
      "AI Video Generator for PC | Create AI Videos Locally | DYOP",
    description:
      "Create AI videos on your PC with DYOP. Generate characters, images, video and music using supported local AI workflows, then edit everything in one application.",
    canonical:
      "/ai-video-for-pc",
  },

  "generative-ai-video": {
    title:
      "Generative AI Video | How AI Video Generation Works | DYOP",
    description:
      "Learn about generative AI video, including text-to-video, image-to-video, AI characters, animation, consistency and the workflow for creating complete AI videos.",
    canonical:
      "/generative-ai-video",
  },

  "ai-creative-suite": {
    title:
      "AI Creative Suite | Images, Video, Characters & Music | DYOP",
    description:
      "Create characters, images, video and music with DYOP, an AI creative suite that brings generative tools and video editing together in one downloadable application.",
    canonical:
      "/ai-creative-suite",
  },

  "free-ai-tools": {
    title:
      "Free AI Tools | Video, Images, Characters & Music | DYOP",

    description:
      "Explore free AI tools for creating characters, images, video, animation and music. DYOP brings AI creation and editing together in one free downloadable package.",

    canonical:
      "/free-ai-tools",
  },

  "all-in-one-ai-generator": {
    title:
      "All-in-One AI Generator | Images, Video, Music & More | DYOP",

    description:
      "Create with an all-in-one AI generator. DYOP combines characters, images, video, music and editing in one free downloadable AI creation package.",

    canonical:
      "/all-in-one-ai-generator",
  },

  "free-ai-content-creation": {
    title:
      "Free AI Content Creation | Create Images, Video & Music | DYOP",

    description:
      "Create AI content for free with DYOP. Generate characters, images, videos and music, then edit everything together in one downloadable creation package.",

    canonical:
      "/free-ai-content-creation",
  },

  "ai-video-software": {
    title:
      "AI Video Software | Download AI Video Creation Software | DYOP",

    description:
      "Download AI video software for creating characters, images, video and music with local AI workflows and editing in one free creation package.",

    canonical:
      "/ai-video-software",
  },

  "ai-without-subscription": {
    title:
      "AI Without Subscription | Free AI Creation Software | DYOP",

    description:
      "Looking for AI without a subscription? DYOP is free downloadable AI creation software for generating characters, images, video and music, with editing in one package.",

    canonical:
      "/ai-without-subscription",
  },

  "local-ai-video-generator": {
    title:
      "Local AI Video Generator | Generate AI Video Locally | DYOP",

    description:
      "Generate AI videos locally with DYOP. Create characters, images, video and music, then edit your project in one free downloadable AI video creation package.",

    canonical:
      "/local-ai-video-generator",
  },

"consistent-ai-generation": {
    title:
      "Consistent AI Generation | Characters, Images & Video | DYOP",

    description:
      "Create consistent AI characters, images and video with DYOP. Build recurring characters, visual styles and scenes for complete AI video projects.",

    canonical:
      "/consistent-ai-generation",
  },

  "ai-music-video-generator": {
    title:
      "AI Music Video Generator | Create AI Music Videos | DYOP",

    description:
      "Create AI music videos with DYOP. Generate visuals for songs, animate artwork, create music video scenes and publish your finished AI-generated video.",

    canonical:
      "/ai-music-video-generator",
  },

};

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
  try {
    const pageKey = String(
      req.query.page || ""
    ).trim();

    const page = pages[pageKey];

    if (!page) {
      return res
        .status(404)
        .send("SEO page not found");
    }

    const canonicalUrl =
      `${SITE_URL}${page.canonical}`;

    // Grab the deployed Vite shell.
    const indexResponse =
      await fetch(`${SITE_URL}/`);

    if (!indexResponse.ok) {
      throw new Error(
        `Could not load DYOP index: ${indexResponse.status}`
      );
    }

    let html =
      await indexResponse.text();

    // Remove generic metadata from index.html.

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
    <!-- DYOP SEO PAGE -->

    <title>${escapeHtml(page.title)}</title>

    <meta
      name="description"
      content="${escapeHtml(page.description)}"
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
      content="${escapeHtml(page.title)}"
    />

    <meta
      property="og:description"
      content="${escapeHtml(page.description)}"
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
      content="${escapeHtml(page.title)}"
    />

    <meta
      name="twitter:description"
      content="${escapeHtml(page.description)}"
    />

    <!-- END DYOP SEO PAGE -->
    `;

    if (!html.includes("</head>")) {
      throw new Error(
        "Could not find </head>"
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

    return res
      .status(200)
      .send(html);
  } catch (error) {
    console.error(
      "seo_page failed:",
      error
    );

    return res
      .status(500)
      .send(
        "Unable to generate SEO page"
      );
  }
}