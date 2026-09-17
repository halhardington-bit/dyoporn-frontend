import VideoCard from "./VideoCard.jsx";

export default function VideoGrid({
  videos = [],
  user = null,
  onRequireLogin,
}) {
  return (
    <div className="grid">
      {videos.map((video) => {
        const locked =
          video.visibility === "private" && !user;

        return (
          <VideoCard
            key={video.id}
            video={video}
            user={user}
            locked={locked}
            onRequireLogin={onRequireLogin}
          />
        );
      })}
    </div>
  );
}