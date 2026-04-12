import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  getComments,
  postComment,
  toggleCommentLike,
  editComment,
  deleteComment,
} from "../api.js";
import ConfirmModal from "./ConfirmModal.jsx";
import "./Comments.css";

function timeAgo(iso) {
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return "";
  const diff = Date.now() - t;

  const sec = Math.floor(diff / 1000);
  if (sec < 5) return "just now";
  if (sec < 60) return `${sec}s ago`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;

  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;

  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;

  const week = Math.floor(day / 7);
  if (week < 5) return `${week}w ago`;

  const month = Math.floor(day / 30);
  if (month < 12) return `${month}mo ago`;

  const year = Math.floor(day / 365);
  return `${year}y ago`;
}

function initialLetter(name) {
  const s = String(name || "").trim();
  return (s[0] || "?").toUpperCase();
}

export default function CommentsSection({
  videoId,
  user,
  onRequireLogin,
}) {
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const [commentsBusy, setCommentsBusy] = useState(false);
  const [commentPostBusy, setCommentPostBusy] = useState(false);
  const [commentError, setCommentError] = useState("");

  const [editing, setEditing] = useState(null);
  const [editingBody, setEditingBody] = useState("");
  const [editBusy, setEditBusy] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyBody, setReplyBody] = useState("");
  const [replyBusy, setReplyBusy] = useState(false);

  const [openReplies, setOpenReplies] = useState(() => new Set());

  const isLoggedIn = !!user?.id;
  const myUsername = user?.username ? String(user.username).toLowerCase() : null;

  const canPost = useMemo(() => commentBody.trim().length > 0, [commentBody]);

  const canSaveEdit = useMemo(
    () => editingBody.trim().length > 0 && !!editing,
    [editingBody, editing]
  );

  const isOwner = (item) => {
    const ownerUsername =
      item?.channelUsername || item?.username || item?.channel_username || null;
    const normalizedOwner = ownerUsername
      ? String(ownerUsername).toLowerCase()
      : null;
    return !!myUsername && !!normalizedOwner && myUsername === normalizedOwner;
  };

  useEffect(() => {
    let cancelled = false;

    async function loadComments() {
      try {
        setCommentsBusy(true);
        const c = await getComments(videoId);
        if (!cancelled) setComments(c?.items ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setCommentsBusy(false);
      }
    }

    setComments([]);
    setCommentBody("");
    setCommentError("");
    setEditing(null);
    setEditingBody("");
    setDeleteTarget(null);
    setReplyingTo(null);
    setReplyBody("");
    setReplyBusy(false);
    setOpenReplies(new Set());

    if (videoId) loadComments();

    return () => {
      cancelled = true;
    };
  }, [videoId]);

  async function handlePostComment(e) {
    e.preventDefault();
    setCommentError("");

    if (!isLoggedIn) return onRequireLogin?.();

    const body = commentBody.trim();
    if (!body) return;

    try {
      setCommentPostBusy(true);
      const resp = await postComment(videoId, body);
      const newComment = resp?.comment;

      if (newComment) {
        setComments((prev) => [newComment, ...prev]);
        setCommentBody("");
      }
    } catch (e) {
      console.error(e);
      setCommentError(e?.message || "Failed to post comment");
    } finally {
      setCommentPostBusy(false);
    }
  }

  async function handleToggleLike(targetId) {
    if (!isLoggedIn) return onRequireLogin?.();

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === targetId) {
          const liked = !c.likedByMe;
          const likeCount = Math.max(0, (c.likeCount || 0) + (liked ? 1 : -1));
          return { ...c, likedByMe: liked, likeCount };
        }

        const replies = Array.isArray(c.replies) ? c.replies : [];
        const hit = replies.some((r) => r.id === targetId);
        if (!hit) return c;

        return {
          ...c,
          replies: replies.map((r) => {
            if (r.id !== targetId) return r;
            const liked = !r.likedByMe;
            const likeCount = Math.max(0, (r.likeCount || 0) + (liked ? 1 : -1));
            return { ...r, likedByMe: liked, likeCount };
          }),
        };
      })
    );

    try {
      const resp = await toggleCommentLike(targetId);

      setComments((prev) =>
        prev.map((c) => {
          if (c.id === targetId) {
            return {
              ...c,
              likedByMe: !!resp.liked,
              likeCount: Number(resp.likeCount ?? c.likeCount ?? 0),
            };
          }

          const replies = Array.isArray(c.replies) ? c.replies : [];
          const hit = replies.some((r) => r.id === targetId);
          if (!hit) return c;

          return {
            ...c,
            replies: replies.map((r) =>
              r.id === targetId
                ? {
                    ...r,
                    likedByMe: !!resp.liked,
                    likeCount: Number(resp.likeCount ?? r.likeCount ?? 0),
                  }
                : r
            ),
          };
        })
      );
    } catch (e) {
      console.error(e);
      try {
        const c = await getComments(videoId);
        setComments(c?.items ?? []);
      } catch {}
    }
  }

  function startEditItem(item, parentId = null) {
    if (!isLoggedIn) return onRequireLogin?.();
    if (!isOwner(item)) return;
    setEditing({ id: item.id, parentId });
    setEditingBody(item.body || "");
  }

  function cancelEdit() {
    setEditing(null);
    setEditingBody("");
  }

  async function saveEditItem(targetId, parentId = null) {
    if (!isLoggedIn) return onRequireLogin?.();

    const body = editingBody.trim();
    if (!body) return;

    try {
      setEditBusy(true);
      const resp = await editComment(targetId, body);
      const updated = resp?.comment;
      if (!updated) return;

      setComments((prev) =>
        prev.map((c) => {
          if (parentId == null) {
            if (c.id !== targetId) return c;
            return {
              ...c,
              body: updated.body,
              updatedAt: updated.updatedAt ?? c.updatedAt,
            };
          }

          if (c.id !== parentId) return c;
          const replies = Array.isArray(c.replies) ? c.replies : [];
          return {
            ...c,
            replies: replies.map((r) =>
              r.id === targetId
                ? {
                    ...r,
                    body: updated.body,
                    updatedAt: updated.updatedAt ?? r.updatedAt,
                  }
                : r
            ),
          };
        })
      );

      cancelEdit();
    } catch (e) {
      console.error(e);
    } finally {
      setEditBusy(false);
    }
  }

  function requestDeleteItem(targetId, parentId = null) {
    if (!isLoggedIn) return onRequireLogin?.();
    setDeleteTarget({ id: targetId, parentId });
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    const { id: targetId, parentId } = deleteTarget;
    setDeleteTarget(null);

    if (!isLoggedIn) return onRequireLogin?.();

    try {
      await deleteComment(targetId);

      setComments((prev) =>
        prev
          .map((c) => {
            if (parentId != null) {
              if (c.id !== parentId) return c;
              const replies = Array.isArray(c.replies) ? c.replies : [];
              return { ...c, replies: replies.filter((r) => r.id !== targetId) };
            }
            return c;
          })
          .filter((c) => (parentId == null ? c.id !== targetId : true))
      );

      if (editing?.id === targetId) cancelEdit();

      if (replyingTo?.anchorId === targetId) {
        setReplyingTo(null);
        setReplyBody("");
      }
    } catch (e) {
      console.error(e);
    }
  }

  function toggleReplies(commentId) {
    setOpenReplies((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) next.delete(commentId);
      else next.add(commentId);
      return next;
    });

    if (replyingTo?.parentId === commentId && openReplies.has(commentId)) {
      setReplyingTo(null);
      setReplyBody("");
    }
  }

  function openReplyComposer(parentId, anchorId, prefill = "") {
    if (!isLoggedIn) return onRequireLogin?.();

    setOpenReplies((prev) => {
      const next = new Set(prev);
      next.add(parentId);
      return next;
    });

    setReplyingTo({ parentId, anchorId });
    setReplyBody(prefill);
  }

  async function handlePostReply(parentCommentId) {
    if (!isLoggedIn) return onRequireLogin?.();

    const body = replyBody.trim();
    if (!body) return;

    try {
      setReplyBusy(true);
      const resp = await postComment(videoId, body, parentCommentId);
      const newReply = resp?.comment;

      if (newReply) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === parentCommentId
              ? { ...c, replies: [newReply, ...(c.replies || [])] }
              : c
          )
        );
        setReplyBody("");
        setReplyingTo(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setReplyBusy(false);
    }
  }

  return (
    <>
      <div className="watchPageCommentsSection">
        <div className="watchPageCommentsHeader">
          <h3 className="watchPageCommentsTitle">
            Comments {commentsBusy ? "…" : `(${comments.length})`}
          </h3>

          {!isLoggedIn ? (
            <button
              className="watchPageCommentsLoginHint"
              onClick={() => onRequireLogin?.()}
              type="button"
            >
              Log in
            </button>
          ) : null}
        </div>

        <form className="watchPageCommentComposer" onSubmit={handlePostComment}>
          <div className="watchPageCommentComposerBody">
            <textarea
              className="watchPageCommentTextarea"
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder={isLoggedIn ? "Add a comment…" : "Log in to comment…"}
              rows={3}
              disabled={!isLoggedIn || commentPostBusy}
            />
            <div className="watchPageCommentComposerActions">
              <div className="watchPageCommentComposerButtons">
                <button
                  className="watchPageBtnPrimary"
                  type="submit"
                  disabled={!isLoggedIn || !canPost || commentPostBusy}
                >
                  {commentPostBusy ? "Posting…" : "Post"}
                </button>

                {!isLoggedIn ? (
                  <button
                    className="watchPageBtnGhost"
                    type="button"
                    onClick={() => onRequireLogin?.()}
                  >
                    Log in
                  </button>
                ) : null}
              </div>

              {commentError ? (
                <div className="watchPageCommentError">{commentError}</div>
              ) : null}
            </div>
          </div>
        </form>

        {comments.length === 0 && !commentsBusy ? (
          <div className="watchPageCommentEmpty">No comments yet.</div>
        ) : null}

        <div className="watchPageCommentList">
          {comments.map((c) => {
            const repliesOpen = openReplies.has(c.id);
            const isEditingComment = editing?.id === c.id && editing?.parentId == null;
            const commentName = c.displayName || c.username;
            const commentUser = c.username || "";
            const showComposerUnderComment =
              replyingTo?.parentId === c.id && replyingTo?.anchorId === c.id;

            return (
              <div key={c.id} className="watchPageCommentItem">
                <div className="watchPageCommentMain">
                  <div className="watchPageCommentMeta">
                    <NavLink
                      to={commentUser ? `/u/${commentUser}` : "#"}
                      className="watchPageCommentAvatarLink"
                      onClick={(e) => {
                        if (!commentUser) e.preventDefault();
                      }}
                      title={commentName}
                    >
                      <div className="watchPageCommentAvatar">
                        {initialLetter(commentName)}
                      </div>
                    </NavLink>

                    <NavLink
                      to={commentUser ? `/u/${commentUser}` : "#"}
                      className="watchPageCommentUserLink"
                      onClick={(e) => {
                        if (!commentUser) e.preventDefault();
                      }}
                    >
                      <span className="watchPageCommentAuthor">{commentName}</span>
                    </NavLink>

                    <span className="dot">•</span>
                    <span className="watchPageCommentTime">
                      {c.createdAt ? timeAgo(c.createdAt) : ""}
                    </span>

                    {c.updatedAt && c.updatedAt !== c.createdAt ? (
                      <>
                        <span className="dot">•</span>
                        <span className="watchPageCommentEdited">edited</span>
                      </>
                    ) : null}
                  </div>

                  {isEditingComment ? (
                    <div className="watchPageCommentEditBox">
                      <div className="watchPageCommentEdit">
                        <textarea
                          className="watchPageCommentEditInput"
                          value={editingBody}
                          onChange={(e) => setEditingBody(e.target.value)}
                          rows={3}
                          disabled={editBusy}
                        />
                        <div className="watchPageCommentEditActions">
                          <button
                            className="watchPageMiniBtn primary"
                            type="button"
                            disabled={!canSaveEdit || editBusy}
                            onClick={() => saveEditItem(c.id, null)}
                          >
                            {editBusy ? "Saving…" : "Save"}
                          </button>
                          <button
                            className="watchPageMiniBtn"
                            type="button"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="watchPageCommentBody">{c.body}</div>
                  )}

                  <div className="watchPageCommentActions">
                    <button
                      type="button"
                      className={`watchPageActionBtn ${c.likedByMe ? "isActive" : ""}`}
                      onClick={() => handleToggleLike(c.id)}
                      disabled={!isLoggedIn}
                    >
                      {c.likedByMe ? "♥" : "♡"} Like{" "}
                      <span className="watchPageActionCount">({c.likeCount || 0})</span>
                    </button>

                    <button
                      type="button"
                      className="watchPageActionBtn"
                      onClick={() => openReplyComposer(c.id, c.id)}
                      disabled={!isLoggedIn}
                    >
                      Reply
                    </button>

                    <button
                      type="button"
                      className="watchPageActionBtn subtle"
                      onClick={() => toggleReplies(c.id)}
                    >
                      {repliesOpen ? "Hide replies" : "Show replies"}{" "}
                      <span className="watchPageActionCount">
                        ({(c.replies || []).length})
                      </span>
                    </button>

                    {isOwner(c) ? (
                      <>
                        <button
                          type="button"
                          className="watchPageActionBtn subtle"
                          onClick={() => startEditItem(c, null)}
                          disabled={!isLoggedIn}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="watchPageActionBtn danger"
                          onClick={() => requestDeleteItem(c.id, null)}
                          disabled={!isLoggedIn}
                        >
                          Delete
                        </button>
                      </>
                    ) : null}
                  </div>

                  {showComposerUnderComment ? (
                    <div className="watchPageReplyComposer">
                      <textarea
                        className="watchPageReplyInput"
                        value={replyBody}
                        onChange={(e) => setReplyBody(e.target.value)}
                        placeholder="Write a reply…"
                        rows={3}
                        disabled={!isLoggedIn || replyBusy}
                      />
                      <div className="watchPageReplyActions">
                        <button
                          className="watchPageMiniBtn primary"
                          type="button"
                          disabled={!replyBody.trim() || replyBusy}
                          onClick={() => handlePostReply(c.id)}
                        >
                          {replyBusy ? "Posting…" : "Post reply"}
                        </button>
                        <button
                          className="watchPageMiniBtn"
                          type="button"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyBody("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {repliesOpen ? (
                    <div className="watchPageReplyList">
                      {(c.replies || []).map((r) => {
                        const isEditingReply =
                          editing?.id === r.id &&
                          String(editing?.parentId) === String(c.id);

                        const replyName = r.displayName || r.username;
                        const replyUser = r.username || "";

                        const showComposerUnderThisReply =
                          replyingTo?.parentId === c.id &&
                          replyingTo?.anchorId === r.id;

                        return (
                          <div key={r.id} className="watchPageReplyItem">
                            <div className="watchPageCommentMain">
                              <div className="watchPageCommentMeta">
                                <NavLink
                                  to={replyUser ? `/u/${replyUser}` : "#"}
                                  className="watchPageReplyAvatarLink"
                                  onClick={(e) => {
                                    if (!replyUser) e.preventDefault();
                                  }}
                                  title={replyName}
                                >
                                  <div className="watchPageCommentAvatar small">
                                    {initialLetter(replyName)}
                                  </div>
                                </NavLink>

                                <NavLink
                                  to={replyUser ? `/u/${replyUser}` : "#"}
                                  className="watchPageReplyUserLink"
                                  onClick={(e) => {
                                    if (!replyUser) e.preventDefault();
                                  }}
                                >
                                  <span className="watchPageCommentAuthor">
                                    {replyName}
                                  </span>
                                </NavLink>

                                <span className="dot">•</span>
                                <span className="watchPageCommentTime">
                                  {r.createdAt ? timeAgo(r.createdAt) : ""}
                                </span>

                                {r.updatedAt && r.updatedAt !== r.createdAt ? (
                                  <>
                                    <span className="dot">•</span>
                                    <span className="watchPageCommentEdited">
                                      edited
                                    </span>
                                  </>
                                ) : null}
                              </div>

                              {isEditingReply ? (
                                <div className="watchPageCommentEditBox">
                                  <div className="watchPageCommentEdit">
                                    <textarea
                                      className="watchPageCommentEditInput"
                                      value={editingBody}
                                      onChange={(e) => setEditingBody(e.target.value)}
                                      rows={3}
                                      disabled={editBusy}
                                    />
                                    <div className="watchPageCommentEditActions">
                                      <button
                                        className="watchPageMiniBtn primary"
                                        type="button"
                                        disabled={!canSaveEdit || editBusy}
                                        onClick={() => saveEditItem(r.id, c.id)}
                                      >
                                        {editBusy ? "Saving…" : "Save"}
                                      </button>
                                      <button
                                        className="watchPageMiniBtn"
                                        type="button"
                                        onClick={cancelEdit}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="watchPageCommentBody watchPageReplyBody">
                                  {r.body}
                                </div>
                              )}

                              <div className="watchPageReplyActionsRow">
                                <button
                                  type="button"
                                  className={`watchPageActionBtn ${r.likedByMe ? "isActive" : ""}`}
                                  onClick={() => handleToggleLike(r.id)}
                                  disabled={!isLoggedIn}
                                >
                                  {r.likedByMe ? "♥" : "♡"} Like{" "}
                                  <span className="watchPageActionCount">
                                    ({r.likeCount || 0})
                                  </span>
                                </button>

                                <button
                                  type="button"
                                  className="watchPageActionBtn subtle"
                                  onClick={() =>
                                    openReplyComposer(
                                      c.id,
                                      r.id,
                                      replyUser ? `@${replyUser} ` : ""
                                    )
                                  }
                                  disabled={!isLoggedIn}
                                >
                                  Reply
                                </button>

                                {isOwner(r) ? (
                                  <div className="watchPageReplyMenu">
                                    <button
                                      type="button"
                                      className="watchPageActionBtn subtle"
                                      onClick={() => startEditItem(r, c.id)}
                                      disabled={!isLoggedIn}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      className="watchPageActionBtn danger"
                                      onClick={() => requestDeleteItem(r.id, c.id)}
                                      disabled={!isLoggedIn}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ) : null}
                              </div>

                              {showComposerUnderThisReply ? (
                                <div className="watchPageReplyComposer">
                                  <textarea
                                    className="watchPageReplyInput"
                                    value={replyBody}
                                    onChange={(e) => setReplyBody(e.target.value)}
                                    placeholder="Write a reply…"
                                    rows={3}
                                    disabled={!isLoggedIn || replyBusy}
                                  />
                                  <div className="watchPageReplyActions">
                                    <button
                                      className="watchPageMiniBtn primary"
                                      type="button"
                                      disabled={!replyBody.trim() || replyBusy}
                                      onClick={() => handlePostReply(c.id)}
                                    >
                                      {replyBusy ? "Posting…" : "Post reply"}
                                    </button>
                                    <button
                                      className="watchPageMiniBtn"
                                      type="button"
                                      onClick={() => {
                                        setReplyingTo(null);
                                        setReplyBody("");
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {deleteTarget && (
        <ConfirmModal
          title="Delete comment?"
          message="This action cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          danger
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}