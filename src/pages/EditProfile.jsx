import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";
import { getMyProfile, updateMyProfile, uploadMyAvatar } from "../api.js";

export default function EditProfile({
  user,
  onRequireLogin,
  onUserUpdated,
  refreshMe,
}) {
  const nav = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [avatarUploading, setAvatarUploading] = useState(false);

  useEffect(() => {
    let alive = true;

    (async () => {
      if (!user) {
        if (!alive) return;
        setLoading(false);
        setForm(null);
        setErr("You must be logged in to edit your profile.");
        return;
      }

      try {
        setLoading(true);
        setErr("");

        const me = await getMyProfile();

        if (!alive) return;
        setForm(me);
      } catch (e) {
        if (!alive) return;
        setErr(e?.message || "Failed to load profile.");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [user]);

  function setField(key, value) {
    setForm((prev) => ({
      ...(prev || {}),
      [key]: value,
    }));
  }

  const avatarPreview = useMemo(() => {
    if (form?.avatarUrl) return form.avatarUrl;
    return form?.displayName || user?.username || "?";
  }, [form?.avatarUrl, form?.displayName, user?.username]);

  const bannerStyle = form?.bannerUrl
    ? { backgroundImage: `url(${form.bannerUrl})` }
    : undefined;

  async function uploadAvatar(file) {
    if (!file) return;

    setErr("");

    try {
      setAvatarUploading(true);

      const result = await uploadMyAvatar(file);

      setForm((prev) => ({
        ...(prev || {}),
        avatarUrl: result.avatarUrl,
      }));

      if (typeof onUserUpdated === "function" && result?.avatarUrl) {
        onUserUpdated((prev) => ({
          ...(prev || user || {}),
          avatarUrl: result.avatarUrl,
        }));
      }

      if (typeof refreshMe === "function") {
        try {
          await refreshMe();
        } catch {}
      }
    } catch (e) {
      setErr(e?.message || "Failed to upload avatar.");
    } finally {
      setAvatarUploading(false);
    }
  }

  async function save() {
    setErr("");

    try {
      setBusy(true);

      const updated = await updateMyProfile(form);

      if (typeof onUserUpdated === "function" && updated?.profile) {
        onUserUpdated((prev) => ({
          ...(prev || user || {}),
          ...updated.profile,
        }));
      }

      if (typeof refreshMe === "function") {
        try {
          await refreshMe();
        } catch {}
      }

      window.location.href = `/u/${updated?.profile?.username || user.username}`;
    } catch (e) {
      setErr(e?.message || "Failed to save profile.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div className="shell">
        <div className="editProfilePage">
          <div className="editProfilePanel">
            <div className="editProfileState">Loading…</div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="shell">
        <div className="editProfilePage">
          <div className="editProfilePanel editProfilePanelNarrow">
            <div className="editProfileEyebrow">PROFILE</div>
            <h1 className="editProfileTitle">Manage Profile</h1>

            <div className="editProfileState">
              {err || "You must be logged in to edit your profile."}
            </div>

            <div className="editProfileActions">
              <button
                className="editProfileBtn editProfileBtnPrimary"
                type="button"
                onClick={() => onRequireLogin?.("/me/profile")}
              >
                Log in
              </button>

              <button
                className="editProfileBtn"
                type="button"
                onClick={() => nav("/watch")}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="shell">
        <div className="editProfilePage">
          <div className="editProfilePanel editProfilePanelNarrow">
            <div className="editProfileEyebrow">PROFILE</div>
            <h1 className="editProfileTitle">Edit profile</h1>
            <div className="editProfileState">
              {err || "Could not load profile."}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shell">
      <div className="editProfilePage">
        <section className="editProfileHero">
          <div className="editProfileHeroBanner" style={bannerStyle}>
            {!form?.bannerUrl ? (
              <div className="editProfileHeroBannerFallback" />
            ) : null}
          </div>

          <div className="editProfileHeroInner">
            <div className="editProfileAvatarWrap">
              <label
                className={`editProfileAvatarPicker ${
                  avatarUploading ? "isUploading" : ""
                }`}
                title={
                  avatarUploading ? "Uploading…" : "Edit profile picture"
                }
              >
                {form?.avatarUrl ? (
                  <div
                    className="editProfileAvatar"
                    style={{ backgroundImage: `url(${form.avatarUrl})` }}
                  />
                ) : (
                  <div className="editProfileAvatar editProfileAvatarFallback">
                    {String(avatarPreview).charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="editProfileAvatarOverlay">
                  <span className="editProfileAvatarEditIcon">
                    {avatarUploading ? "…" : "✎"}
                  </span>
                </div>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  hidden
                  disabled={avatarUploading || busy}
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      uploadAvatar(file);
                    }

                    e.target.value = "";
                  }}
                />
              </label>
            </div>

            <div className="editProfileHeroText">
              <div className="editProfileEyebrow">PROFILE</div>
              <h1 className="editProfileTitle">Manage Profile</h1>
              <p className="editProfileLead">
                Update how your channel appears across the site. Keep it clean,
                readable, and on-brand.
              </p>
            </div>
          </div>
        </section>

        <section className="editProfilePanel">
          <div className="editProfilePanelHeader">
            <div>
              <div className="editProfileSectionEyebrow">DETAILS</div>
              <h2 className="editProfileSectionTitle">Public profile</h2>
            </div>
          </div>

          <div className="editProfileFormGrid">
            <label className="editProfileField">
              <span className="editProfileLabel">Display name</span>
              <input
                className="editProfileInput"
                value={form.displayName || ""}
                onChange={(e) => setField("displayName", e.target.value)}
                placeholder="How your name appears publicly"
                maxLength={80}
              />
            </label>

            <label className="editProfileField editProfileFieldFull">
              <span className="editProfileLabel">Bio</span>
              <textarea
                className="editProfileTextarea"
                rows={5}
                value={form.bio || ""}
                onChange={(e) => setField("bio", e.target.value)}
                placeholder="Tell people a little about yourself or your channel"
                maxLength={500}
              />
            </label>
          </div>

          {err ? <div className="editProfileError">{err}</div> : null}

          <div className="editProfileActions">
            <button
              className="editProfileBtn"
              type="button"
              onClick={() => nav(-1)}
              disabled={busy || avatarUploading}
            >
              Cancel
            </button>

            <button
              className="editProfileBtn editProfileBtnPrimary"
              type="button"
              onClick={save}
              disabled={busy || avatarUploading}
            >
              {busy ? "Saving…" : "Save changes"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}