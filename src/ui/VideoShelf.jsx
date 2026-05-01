import "./VideoShelf.css";
import VideoCard from "./VideoCard.jsx";
import { deleteVideo } from "../api.js";

export function VideoShelf({
  title,
  videos = [],
  user = null,
  onRequireLogin,
  startIndex = 0,
  lockAfter = null,
  onVideoDeleted,
}) {
  async function handleDelete(v) {
    await deleteVideo(v.id);
    onVideoDeleted?.(v);
  }

  return (
    <section className="shelf">
      <div className="shelfHead">
        <h3 className="shelfTitle">{title}</h3>
      </div>

      <div className="shelfRow">
        {videos.map((video, idx) => {
          const globalIndex = startIndex + idx;

          const locked =
            lockAfter != null &&
            globalIndex >= lockAfter;

          return (
            <VideoCard
              key={video.id}
              video={video}
              user={user}
              locked={locked}
              onRequireLogin={onRequireLogin}
              onRequestDelete={handleDelete}
            />
          );
        })}
      </div>
    </section>
  );
}