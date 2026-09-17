import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getVideos } from "../api.js";

function prettifyTag(tag) {
  return String(tag || "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Tag() {
  const { tag: rawTag } = useParams();

  const tag = useMemo(() => {
    try {
      return decodeURIComponent(rawTag || "").trim();
    } catch {
      return String(rawTag || "").trim();
    }
  }, [rawTag]);

  const displayTag = prettifyTag(tag);

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadVideos() {
      setLoading(true);
      setError("");

      try {
        const result = await getVideos({
          tag,
          sort: "newest",
        });

        if (!cancelled) {
          setVideos(Array.isArray(result) ? result : []);
        }
      } catch (err) {
        console.error("Failed to load tag videos:", err);

        if (!cancelled) {
          setVideos([]);
          setError("Unable to load videos.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (tag) {
      loadVideos();
    } else {
      setVideos([]);
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [tag]);

  useEffect(() => {
    if (!tag) return;

    const title = `${displayTag} Videos | DYOP`;

    const description =
      `Watch ${displayTag} videos on DYOP. ` +
      `Discover AI-generated videos, creators and new content tagged ${displayTag}.`;

    const canonicalUrl =
      `https://www.dyop.ai/tag/${encodeURIComponent(tag.toLowerCase())}`;

    document.title = title;

    function setMeta(name, content) {
      let element = document.querySelector(
        `meta[name="${name}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    }

    setMeta("description", description);
    setMeta("robots", "index, follow");

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalUrl);
  }, [tag, displayTag]);

  return (
    <main className="tagPage">
      <header className="tagPageHeader">
        <div className="tagPageEyebrow">
          Explore DYOP
        </div>

        <h1>#{displayTag}</h1>

        <p>
          Explore videos tagged{" "}
          <strong>{displayTag}</strong> on DYOP.
        </p>
      </header>

      {loading && (
        <div className="tagPageStatus">
          Loading videos...
        </div>
      )}

      {!loading && error && (
        <div className="tagPageStatus">
          {error}
        </div>
      )}

      {!loading && !error && videos.length === 0 && (
        <div className="tagPageEmpty">
          <h2>No videos yet</h2>

          <p>
            There aren't any public videos tagged{" "}
            <strong>{displayTag}</strong> yet.
          </p>
        </div>
      )}

      {!loading && !error && videos.length > 0 && (
        <>
          <div className="tagPageCount">
            {videos.length}{" "}
            {videos.length === 1 ? "video" : "videos"}
          </div>

          <div className="tagVideoGrid">
            {videos.map((video) => (
              <Link
                key={video.id}
                to={`/watch/${video.id}`}
                className="tagVideoCard"
              >
                <div className="tagVideoThumb">
                  <img
                    src={video.thumbUrl}
                    alt={video.title || ""}
                    loading="lazy"
                  />

                  {video.durationText && (
                    <span className="tagVideoDuration">
                      {video.durationText}
                    </span>
                  )}
                </div>

                <div className="tagVideoInfo">
                  <h2>{video.title}</h2>

                  <div className="tagVideoCreator">
                    {video.channelDisplayName ||
                      video.channelUsername ||
                      ""}
                  </div>

                  <div className="tagVideoMeta">
                    {Number(video.views || 0).toLocaleString()}{" "}
                    views
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  );
}