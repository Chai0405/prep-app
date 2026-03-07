import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [menuOpen,setMenuOpen] = useState(false);   // NEW

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));

  }, []);


  const handleLogout = async () => {

    try {

      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
      });

      localStorage.removeItem("token");

      navigate("/auth");

    } catch (err) {

      console.error("Logout error:", err);

    }

  };


  return (
    <>

      <div className="dashboard-navbar">

        {/* LEFT LOGO */}
        <div className="nav-left">
          <img
            src="/logo.png"
            className="nav-logo"
            alt="Prep Logo"
            onClick={() => navigate("/")}
          />
        </div>


        {/* CENTER LINKS */}
        <div className="nav-center">
          <NavLink to="/dashboard">Home</NavLink>
          <NavLink to="/planner">Planner</NavLink>
          <NavLink to="/recipes">Recipes</NavLink>
          <NavLink to="/grocery">Grocery</NavLink>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/about">About us</NavLink>
        </div>


        {/* RIGHT PROFILE */}
        <div className="nav-right">

          {/* HAMBURGER */}
          <div
            className="hamburger"
            onClick={()=>setMenuOpen(!menuOpen)}
          >
            ☰
          </div>

          <div
            className="profile-circle"
            onClick={() => navigate("/profile")}
          >
            {user?.avatar ? (
              <img src={user.avatar} alt="avatar" />
            ) : (
              <span>{user?.name?.slice(0,2).toUpperCase()}</span>
            )}
          </div>

          <span
            className="logout-text"
            onClick={() => setShowLogoutConfirm(true)}
          >
            Sign out
          </span>

        </div>

      </div>


      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="mobile-menu">

          <NavLink to="/dashboard" onClick={()=>setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/planner" onClick={()=>setMenuOpen(false)}>Planner</NavLink>
          <NavLink to="/recipes" onClick={()=>setMenuOpen(false)}>Recipes</NavLink>
          <NavLink to="/grocery" onClick={()=>setMenuOpen(false)}>Grocery</NavLink>
          <NavLink to="/blogs" onClick={()=>setMenuOpen(false)}>Blogs</NavLink>
          <NavLink to="/about" onClick={()=>setMenuOpen(false)}>About us</NavLink>

        </div>

      )}


      {/* LOGOUT MODAL */}

      {showLogoutConfirm && (

        <div className="logout-modal-overlay">

          <div className="logout-modal">

            <p>Are you sure you want to logout?</p>

            <div className="logout-actions">

              <button
                className="cancel-btn"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={handleLogout}
              >
                Sign out
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}