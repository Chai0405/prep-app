import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Toast from "../components/Toast";
import "../styles/profile.css";
import { apiFetch } from "../utils/api";
import { checkAvatarFile, resizeAvatar } from "../utils/avatar";
import { notifyUserUpdated } from "../utils/userEvents";

export default function Profile() {

  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast,setToast] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [pendingAvatar, setPendingAvatar] = useState(null);
  const [savingAvatar, setSavingAvatar] = useState(false);
  const [deleteData, setDeleteData] = useState({ password: "", confirm: "" });
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [passwordData, setPasswordData] = useState({
    current: "",
    newPassword: "",
    confirm: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Step 1: pick a file -> validate, shrink and preview it (nothing saved yet)
  const handleAvatarSelect = async (e) => {

    const file = e.target.files[0];
    e.target.value = ""; // allow picking the same file again
    if (!file) return;

    const fileError = checkAvatarFile(file);

    if (fileError) {
      setToast(fileError);
      return;
    }

    try {
      setPendingAvatar(await resizeAvatar(file));
    } catch (err) {
      console.error("Avatar processing failed", err);
      setToast(err.message || "That image could not be used");
    }

  };

  // Step 2: "Update Avatar" saves the previewed image
  const handleAvatarSave = async () => {

    setSavingAvatar(true);

    try {

      const res = await apiFetch("/api/user/avatar",{
        method:"PUT",
        body:{ avatar: pendingAvatar }
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setToast(data.message || "Avatar upload failed");
        return;
      }

      setUser(data);
      setPendingAvatar(null);
      notifyUserUpdated(data);
      setToast("Avatar updated");

    } catch (err) {
      console.error("Avatar upload failed", err);
      setToast("Avatar upload failed");
    } finally {
      setSavingAvatar(false);
    }

  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordUpdate = async () => {

    if (passwordData.newPassword !== passwordData.confirm) {
      setToast("Passwords do not match");
      return;
    }

    try {

      const res = await apiFetch("/api/auth/password",{
        method:"PUT",
        body:{
          current: passwordData.current,
          newPassword: passwordData.newPassword
        }
      });

      const data = await res.json();

      if (!res.ok) {
        setToast(data.message);
        return;
      }

      // Other sessions are signed out; keep this one with the fresh token
      if (data.token) localStorage.setItem("token", data.token);

      setToast("Password updated successfully");

      setPasswordData({
        current:"",
        newPassword:"",
        confirm:""
      });

      setShowPassword(false);

    } catch (err) {
      console.error(err);
    }

  };

  const handleSave = async () => {

    try {

      const res = await apiFetch("/api/user/profile",{
        method:"PUT",
        body:{ name: user.name, email: user.email }
      });

      const data = await res.json();

      if (!res.ok) {
        setToast(data.message || "Update failed");
        return;
      }

      setUser(data);
      notifyUserUpdated(data);
      setEditMode(false);

    } catch (err) {
      console.error(err);
    }

  };

  const closeDelete = () => {
    setShowDelete(false);
    setDeleteData({ password: "", confirm: "" });
  };

  const handleDeleteAccount = async () => {

    setDeleting(true);

    try {

      const res = await apiFetch("/api/user", {
        method: "DELETE",
        body: deleteData
      });

      const data = await res.json();

      if (!res.ok) {
        setToast(data.message || "Account deletion failed");
        return;
      }

      localStorage.removeItem("token");
      navigate("/", { replace: true });

    } catch (err) {
      console.error(err);
      setToast("Account deletion failed");
    } finally {
      setDeleting(false);
    }

  };

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const res = await apiFetch("/api/auth/me");

        if(!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        setUser(data);

      } catch(err) {
        console.error("Profile fetch error:",err);
      }

    };

    fetchUser();

  },[]);

  return (

    <div className="profile-page">

      <section className="profile-hero">
        <div className="profile-hero-overlay">
          <h1>Account Settings</h1>
          <p>Manage your personal information and security.</p>
        </div>
      </section>

      <section className="profile-container">

        <div className="profile-section-card">

          <h2>Account Information</h2>

          <div className="avatar-row">

            <div className="avatar-preview">

              {pendingAvatar || user?.avatar ? (
                <img src={pendingAvatar || user.avatar} alt="Avatar"/>
              ) : (
                <span>{user?.name?.slice(0,2).toUpperCase()}</span>
              )}

            </div>

            {pendingAvatar ? (
              <div className="avatar-actions">
                <button
                  className="save-btn"
                  onClick={handleAvatarSave}
                  disabled={savingAvatar}
                >
                  {savingAvatar ? "Updating..." : "Update Avatar"}
                </button>
                <button
                  className="profile-outline-btn"
                  onClick={()=>setPendingAvatar(null)}
                  disabled={savingAvatar}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <label className="avatar-upload">
                Change Avatar
                <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={handleAvatarSelect} hidden/>
              </label>
            )}

          </div>

          <div className="profile-row">
            <span>Name</span>

            {editMode ? (
              <input
                name="name"
                value={user?.name || ""}
                onChange={handleChange}
              />
            ) : (
              <p>{user?.name}</p>
            )}

          </div>

          <div className="profile-row">
            <span>Email</span>

            {editMode ? (
              <input
                name="email"
                value={user?.email || ""}
                onChange={handleChange}
              />
            ) : (
              <p>{user?.email}</p>
            )}

          </div>

          <div className="profile-row">
            <span>Password</span>
            <p>••••••••</p>
          </div>

          <div className="profile-actions">

            {editMode ? (
              <>
                <button
                  className="profile-outline-btn"
                  onClick={()=>setEditMode(false)}
                >
                  Cancel
                </button>

                <button
                  className="save-btn"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                className="profile-outline-btn"
                onClick={()=>setEditMode(true)}
              >
                Edit Account Details
              </button>
            )}

            <button
              className="profile-outline-btn"
              onClick={()=>setShowPassword(true)}
            >
              Change Password
            </button>

          </div>

        </div>

        <div className="profile-section-card danger">
          <h2>Danger Zone</h2>
          <button
            className="danger-btn"
            onClick={()=>setShowDelete(true)}
          >
            Delete Account
          </button>
        </div>

      </section>

      {showPassword && (

        <div className="password-modal">

          <div className="password-box">

            <h3>Change Password</h3>

            <input
              type="password"
              name="current"
              placeholder="Current password"
              value={passwordData.current}
              onChange={handlePasswordChange}
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />

            <input
              type="password"
              name="confirm"
              placeholder="Confirm new password"
              value={passwordData.confirm}
              onChange={handlePasswordChange}
            />

            <div className="modal-actions">

              <button onClick={()=>setShowPassword(false)}>
                Cancel
              </button>

              <button
                className="save"
                onClick={handlePasswordUpdate}
              >
                Update
              </button>

            </div>

          </div>

        </div>

      )}

      {showDelete && (

        <div className="password-modal">

          <div
            className="password-box"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
          >

            <h3 id="delete-account-title">Delete Account</h3>

            <p className="delete-warning">
              This permanently deletes your account, meal plans, grocery
              list, recipe requests and newsletter subscription. This cannot be undone.
            </p>

            <input
              type="password"
              placeholder="Current password"
              aria-label="Current password"
              autoComplete="current-password"
              value={deleteData.password}
              onChange={(e)=>setDeleteData({ ...deleteData, password: e.target.value })}
            />

            <input
              placeholder='Type DELETE to confirm'
              aria-label="Type DELETE to confirm"
              value={deleteData.confirm}
              onChange={(e)=>setDeleteData({ ...deleteData, confirm: e.target.value })}
            />

            <div className="modal-actions">

              <button onClick={closeDelete}>
                Cancel
              </button>

              <button
                className="save danger-confirm"
                onClick={handleDeleteAccount}
                disabled={deleting || deleteData.confirm !== "DELETE" || !deleteData.password}
              >
                {deleting ? "Deleting..." : "Delete permanently"}
              </button>

            </div>

          </div>

        </div>

      )}

      <Toast message={toast} setMessage={setToast}/>

    </div>

  );

}