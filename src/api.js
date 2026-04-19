const API_BASE = (import.meta.env.VITE_API_BASE || "http://localhost:3001").replace(/\/$/, "");

const INCLUDE_TEST =
  String(import.meta.env.VITE_INCLUDE_TEST_DATA || "0") === "1";

// helper
function qs(paramsObj = {}) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(paramsObj)) {
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      params.set(k, v);
    }
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}

export async function recordHistory(id, progressSeconds = 0) {
  const res = await fetch(`${API_BASE}/api/videos/${id}/history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ progressSeconds }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to record history");
  return data;
}

export async function removeHistoryItem(videoId) {
  const res = await fetch(`${API_BASE}/api/me/history/${videoId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to remove history item");
  return data;
}

export async function getHomeRows() {
  const res = await fetch(`${API_BASE}/api/home`, {
    credentials: "include",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to load home rows");
  return Array.isArray(data) ? data : [];
}

export async function clearHistory() {
  const res = await fetch(`${API_BASE}/api/me/history`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to clear history");
  return data;
}

export async function forgotPassword(email) {
  const res = await fetch(`${API_BASE}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to request password reset");
  return data;
}

export async function resetPassword(token, password) {
  const res = await fetch(`${API_BASE}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ token, password }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to reset password");
  return data;
}


export async function resendVerificationEmail() {
  const res = await fetch(`${API_BASE}/auth/resend-verification`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to resend verification email");
  return data;
}

export async function verifyEmail(token) {
  const res = await fetch(`${API_BASE}/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ token }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to verify email");
  return data;
}


// BETA
export async function betaSignup({ email, watching = false, creating = false }) {
  const res = await fetch(`${API_BASE}/api/beta-signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      watching,
      creating,
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || "Beta signup failed");
  }

  return data;
}

// VIDEOS
export async function getVideos({ q, category, sort, filter } = {}) {
  const url = `${API_BASE}/api/videos${qs({
    q,
    category,
    sort,
    filter,
    includeTest: INCLUDE_TEST ? "1" : undefined,
  })}`;
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error(`getVideos failed: ${res.status}`);
  return res.json();
}

export async function getVideo(id) {
  const url = `${API_BASE}/api/videos/${id}${qs({
    includeTest: INCLUDE_TEST ? "1" : undefined,
  })}`;
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error(`getVideo failed: ${res.status}`);
  return res.json();
}

export async function getChannelSubscription(channelId) {
  const res = await fetch(`${API_BASE}/api/channels/${channelId}/subscription`, {
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.error || "Failed to fetch subscription info");
  }

  return data;
}

export async function subscribeToChannel(channelId) {
  const res = await fetch(`${API_BASE}/api/channels/${channelId}/subscribe`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.error || "Failed to subscribe");
  }

  return data;
}

export async function unsubscribeFromChannel(channelId) {
  const res = await fetch(`${API_BASE}/api/channels/${channelId}/subscribe`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.error || "Failed to unsubscribe");
  }

  return data;
}

export async function getMySubscriptions() {
  const res = await fetch(`${API_BASE}/api/me/subscriptions`, {
    credentials: "include",
  });

  const data = await res.json().catch(() => ([]));

  if (!res.ok) {
    throw new Error(data?.error || "Failed to load subscriptions");
  }

  return data;
}


export async function getCategories() {
  const res = await fetch(`${API_BASE}/api/categories`, { credentials: "include" });
  if (!res.ok) throw new Error(`getCategories failed: ${res.status}`);
  return res.json();
}


// THUMBS
export function thumbUrl(video) {
  return video?.thumbUrl || video?.thumb || "";
}

// STREAM
export function streamUrl(videoOrId) {
  if (!videoOrId) return "";

  if (typeof videoOrId === "object" && videoOrId.playbackUrl) {
    return videoOrId.playbackUrl;
  }

  const id = typeof videoOrId === "object" ? videoOrId.id : videoOrId;
  return `${API_BASE}/videos/${id}/stream`;
}

export async function getWatchLater() {
  const res = await fetch(`${API_BASE}/api/me/watch-later`, {
    credentials: "include",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to load Watch Later");
  return Array.isArray(data) ? data : [];
}

export async function addToWatchLater(videoId) {
  const res = await fetch(`${API_BASE}/api/me/watch-later/${videoId}`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to add to Watch Later");
  return data;
}

export async function removeFromWatchLater(videoId) {
  const res = await fetch(`${API_BASE}/api/me/watch-later/${videoId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to remove from Watch Later");
  return data;
}

export async function getWatchLaterStatus(videoId) {
  const res = await fetch(`${API_BASE}/api/me/watch-later/${videoId}`, {
    credentials: "include",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to load Watch Later status");
  return data;
}


// REPORTS
export async function reportVideo(videoId, { offense, comments } = {}) {
  const res = await fetch(`${API_BASE}/api/videos/${videoId}/report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ offense, comments }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to report video");
  return data;
}

export async function getModerationReports({
  archived = false,
  q = "",
  limit = 100,
  offset = 0,
} = {}) {
  const params = new URLSearchParams();
  params.set("archived", archived ? "1" : "0");
  params.set("limit", String(limit));
  params.set("offset", String(offset));
  if (String(q || "").trim()) params.set("q", String(q).trim());

  const res = await fetch(`${API_BASE}/api/mod/reports?${params.toString()}`, {
    credentials: "include",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to load moderation reports");
  return Array.isArray(data) ? data : [];
}

export async function resolveModerationReport(reportId, action) {
  const res = await fetch(`${API_BASE}/api/mod/reports/${reportId}/resolve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ action }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to resolve report");
  return data;
}


// RATINGS
export async function rateVideo(id, rating) {
  const res = await fetch(`${API_BASE}/api/videos/${id}/rate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ rating }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `rateVideo failed: ${res.status}`);
  return data;
}

export async function getMyRating(id) {
  const res = await fetch(`${API_BASE}/api/videos/${id}/my-rating`, {
    credentials: "include",
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) return { rating: null };
  return data;
}

// COMMENTS
export async function getComments(videoId, { limit = 50, offset = 0 } = {}) {
  const res = await fetch(
    `${API_BASE}/api/videos/${videoId}/comments?limit=${limit}&offset=${offset}`,
    { credentials: "include" }
  );
  if (!res.ok) throw new Error(`getComments failed: ${res.status}`);
  return res.json();
}

export async function postComment(videoId, body, parentCommentId = null) {
  const res = await fetch(`${API_BASE}/api/videos/${videoId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ body, parentCommentId }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `postComment failed: ${res.status}`);
  return data;
}

export async function uploadVideo({
  title,
  description,
  tags,
  visibility,
  file,

  // new
  mediaType = "video",   // "video" | "audio"
  assetScope = "public", // "public" | "library"
} = {}) {
  const fd = new FormData();
  fd.append("title", title ?? "");
  fd.append("description", description ?? "");
  fd.append("tags", tags ?? "");
  fd.append("visibility", visibility || "public");

  // new metadata
  fd.append("mediaType", mediaType);
  fd.append("assetScope", assetScope);

  // keep your existing server expectation:
  // must match upload.single("video") in server.js
  fd.append("video", file);

  const res = await fetch(`${API_BASE}/api/videos/upload`, {
    method: "POST",
    credentials: "include",
    body: fd,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `uploadVideo failed: ${res.status}`);
  return data; // { ok, video }
}

export async function toggleCommentLike(commentId) {
  const res = await fetch(`${API_BASE}/api/comments/${commentId}/toggle-like`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `toggleCommentLike failed: ${res.status}`);
  return data;
}

export async function editComment(commentId, body) {
  const res = await fetch(`${API_BASE}/api/comments/${commentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ body }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `editComment failed: ${res.status}`);
  return data;
}

export async function deleteComment(commentId) {
  const res = await fetch(`${API_BASE}/api/comments/${commentId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `deleteComment failed: ${res.status}`);
  return data;
}

export async function updateVideo(videoId, payload) {
  const res = await fetch(`${API_BASE}/api/videos/${videoId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `updateVideo failed: ${res.status}`);
  return data.video;
}

export async function deleteVideo(videoId) {
  const res = await fetch(`${API_BASE}/api/videos/${videoId}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `deleteVideo failed: ${res.status}`);
  return data;
}

// PROFILES
export async function getProfileByUsername(username) {
  const res = await fetch(
    `${API_BASE}/api/profile/u/${encodeURIComponent(username)}`,
    { credentials: "include" }
  );

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `getProfile failed: ${res.status}`);
  return data;
}

export async function getMyProfile() {
  const res = await fetch(`${API_BASE}/api/profile/me`, {
    credentials: "include",
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `getMyProfile failed: ${res.status}`);
  return data;
}

export async function updateMyProfile(payload) {
  const res = await fetch(`${API_BASE}/api/profile/me`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `updateMyProfile failed: ${res.status}`);
  return data.profile;
}

export async function recordView(id) {
  const r = await fetch(`${API_BASE}/api/videos/${id}/view`, {
    method: "POST",
    credentials: "include",
  });

  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data?.error || "Failed to record view");
  return data;
}

export async function logoutAllDevices() {
  const res = await fetch(`${API_BASE}/auth/logout-all`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.error || "Failed to log out of all devices");
  }

  return data;
}

export async function sendChangePasswordEmail() {
  const res = await fetch(`${API_BASE}/auth/send-change-password-email`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.error || "Failed to send password reset email");
  }

  return data;
}

export async function getUserVideos(
  username,
  { sort, scope, type } = {} // NEW: scope + type
) {
  const params = new URLSearchParams();
  if (sort) params.set("sort", sort);

  // NEW filters:
  // scope: "public" | "library"
  // type: "video" | "audio" | "all"
  if (scope) params.set("scope", scope);
  if (type) params.set("type", type);

  const res = await fetch(
    `${API_BASE}/api/profile/u/${encodeURIComponent(username)}/videos?${params.toString()}`,
    { credentials: "include" }
  );

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `getUserVideos failed: ${res.status}`);
  return data;
}

export async function updateMyTier(tier) {
  const res = await fetch(`${API_BASE}/api/me/tier`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ tier }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || "Failed to update plan");
  }

  return data;
}


export async function getModerationUsers({ q = "", filterBy = "all", limit = 50, offset = 0 } = {}) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (filterBy) params.set("filterBy", filterBy);
  params.set("limit", String(limit));
  params.set("offset", String(offset));

  const res = await fetch(`${API_BASE}/api/mod/users?${params.toString()}`, {
    credentials: "include",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to fetch moderation users");
  return data;
}

export async function getModerationUserById(userId) {
  const res = await fetch(`${API_BASE}/api/mod/users/${userId}`, {
    credentials: "include",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to fetch moderation user");
  return data;
}

export async function updateModerationUser(userId, payload) {
  const res = await fetch(`${API_BASE}/api/mod/users/${userId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Failed to update moderation user");
  return data;
}

export async function registerBeta({
  email,
  username,
  password,
  dateOfBirth,
  country,
}) {
  const res = await fetch(`${API_BASE}/auth/register-beta`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email,
      username,
      password,
      dateOfBirth,
      country,
    }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `Beta registration failed: ${res.status}`);
  return data;
}

// AUTH
export async function login({ email, password }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `Login failed: ${res.status}`);
  return data;
}

export async function register({
  email,
  username,
  password,
  dateOfBirth,
  country,
}) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email,
      username,
      password,
      dateOfBirth,
      country,
    }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `Register failed: ${res.status}`);
  return data;
}

export async function logout() {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `Logout failed: ${res.status}`);
  return data;
}

export async function me() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    credentials: "include",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function whoami() {
  const res = await fetch(`${API_BASE}/__whoami`, { credentials: "include" });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || `whoami failed: ${res.status}`);
  return data?.user ?? null;
}

export async function publishGeneratedVideo(payload) {
  const res = await fetch(`${API_BASE}/api/generate/publish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Publish failed");
  return data;
}

export async function listProjects() {
  const r = await fetch(`${API_BASE}/api/generate/projects`, {
    credentials: "include",
  });
  if (!r.ok) throw new Error("Failed to fetch projects");
  return r.json();
}

export async function createProject(title) {
  const r = await fetch(`${API_BASE}/api/generate/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title }),
  });
  if (!r.ok) throw new Error("Failed to create project");
  return r.json();
}

export async function loadProject(id) {
  const r = await fetch(`${API_BASE}/api/generate/projects/${id}`, {
    credentials: "include",
  });
  if (!r.ok) throw new Error("Failed to load project");
  return r.json();
}

export async function saveProject(id, payload) {
  const r = await fetch(`${API_BASE}/api/generate/projects/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error("Failed to save project");
  return r.json();
}
