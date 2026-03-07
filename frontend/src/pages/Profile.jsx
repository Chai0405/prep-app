/* eslint-env node */
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Toast from "../components/Toast";
import "../styles/profile.css";

export default function Profile() {

  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast,setToast] = useState("");

  // const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [passwordData, setPasswordData] = useState({
    current: "",
    newPassword: "",
    confirm: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = async (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {

      const avatarBase64 = reader.result;

      try {

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/avatar`,{
          method:"PUT",
          credentials:"include",
          headers:{ "Content-Type":"application/json"},
          body: JSON.stringify({ avatar: avatarBase64 })
        });

        const data = await res.json();
        setUser(data);

      } catch (err) {
        console.error("Avatar upload failed", err);
      }

    };

    reader.readAsDataURL(file);
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

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/password`,{
        method:"PUT",
        credentials:"include",
        headers:{ "Content-Type":"application/json"},
        body: JSON.stringify({
          current: passwordData.current,
          newPassword: passwordData.newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setToast(data.message);
        return;
      }

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

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile`,{
        method:"PUT",
        credentials:"include",
        headers:{ "Content-Type":"application/json"},
        body: JSON.stringify(user)
      });

      const data = await res.json();

      setUser(data);
      setEditMode(false);

    } catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`,{
          credentials:"include"
        });

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

      {/* HERO */}
      <section className="profile-hero">
        <div className="profile-hero-overlay">
          <h1>Account Settings</h1>
          <p>Manage your personal information and security.</p>
        </div>
      </section>

      <section className="profile-container">

        <div className="profile-section-card">

          <h2>Account Information</h2>

          {/* AVATAR */}
          <div className="avatar-row">

            <div className="avatar-preview">

              {user?.avatar ? (
                <img src={user?.avatar || "/default-avatar.png"} alt="Avatar"/>
              ) : (
                <span>{user?.name?.slice(0,2).toUpperCase()}</span>
              )}

            </div>

            <label className="avatar-upload">
              Change Avatar
              <input type="file" accept="image/*" onChange={handleAvatarUpload} hidden/>
            </label>

          </div>

          {/* NAME */}
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

          {/* EMAIL */}
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

          {/* PASSWORD */}
          <div className="profile-row">
            <span>Password</span>
            <p>••••••••</p>
          </div>

          {/* BUTTONS */}
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

        {/* DANGER */}
        <div className="profile-section-card danger">
          <h2>Danger Zone</h2>
          <button className="danger-btn">Delete Account</button>
        </div>

      </section>

      {/* PASSWORD MODAL */}
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

      <Toast message={toast} setMessage={setToast}/>

    </div>

  );

}