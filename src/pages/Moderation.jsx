import "./Moderation.css";
import { useNavigate } from "react-router-dom";

export default function Moderation() {
  const nav = useNavigate();

  return (
    <div className="page page--moderation">
      <div className="moderationHeader">
        <h2>Moderation</h2>
        <p>Manage platform content, users, reports, and platform analytics.</p>
      </div>

      <div className="moderationGrid">
        <div className="moderationCard">
          <div className="moderationCardTitle">Manage Videos</div>

          <div className="moderationCardDesc">
            Review, edit, blacklist, or remove uploaded videos.
          </div>

          <button
            className="moderationBtn"
            onClick={() => nav("/moderation/videos")}
          >
            Open Video Manager
          </button>
        </div>

        <div className="moderationCard">
          <div className="moderationCardTitle">Manage Reports</div>

          <div className="moderationCardDesc">
            Review reported videos and take moderation action.
          </div>

          <button
            className="moderationBtn"
            onClick={() => nav("/moderation/reports")}
          >
            View Reports
          </button>
        </div>

        <div className="moderationCard">
          <div className="moderationCardTitle">Manage Users</div>

          <div className="moderationCardDesc">
            Manage accounts, permissions, moderation status, and bans.
          </div>

          <button
            className="moderationBtn"
            onClick={() => nav("/moderation/users")}
          >
            Open User Manager
          </button>
        </div>

        <div className="moderationCard">
          <div className="moderationCardTitle">Platform Stats</div>

          <div className="moderationCardDesc">
            View site traffic, watch time, uploads, reports, and beta growth.
          </div>

          <button
            className="moderationBtn"
            onClick={() => nav("/moderation/stats")}
          >
            Open Stats
          </button>
        </div>
      </div>
    </div>
  );
}