import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ShoppingCart, Search } from "lucide-react";
import CartSidebar from "../components/CartSidebar";
import SearchPanel from "./SearchPanel";
import { apiFetch } from "../utils/api";
import { USER_UPDATED } from "../utils/userEvents";

export default function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [menuOpen,setMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Ctrl+K / Cmd+K opens search from anywhere
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const cartCount = useSelector((state) => state.cart.cartItems.length);

  useEffect(() => {

    if (!localStorage.getItem("token")) return;

    apiFetch("/api/auth/me")
      .then(res => (res.ok ? res.json() : null))
      .then(data => setUser(data))
      .catch(() => setUser(null));

  }, []);

  // Profile edits (avatar, name) show up here without a reload
  useEffect(() => {
    const update = (e) => setUser(e.detail);
    window.addEventListener(USER_UPDATED, update);
    return () => window.removeEventListener(USER_UPDATED, update);
  }, []);


  const handleLogout = async () => {

    try {

      await apiFetch("/api/auth/logout", { method: "POST" });

    } catch (err) {

      console.error("Logout error:", err);

    }

    // Sign out locally even if the server call failed
    localStorage.removeItem("token");

    navigate("/auth");

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
          <NavLink to="/pantry">Pantry</NavLink>
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

          <button
            type="button"
            className="nav-search-btn"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            title="Search (Ctrl+K)"
          >
            <Search size={19} />
          </button>

          <div
  className="cart-icon-wrapper"
  onClick={() => setIsCartOpen(true)}
>

  <ShoppingCart  
  size={20} />

  {
    cartCount > 0 && (

      <span className="cart-badge">

        {cartCount}

      </span>

    )
  }

</div>

          <div
            className="profile-circle"
            onClick={() => navigate("/profile")}
          >
            {user?.avatar ? (
              <img src={user.avatar} alt="avatar" />
            ) : (
              <span>
  {user?.name ? user.name.slice(0, 2).toUpperCase() : ""}
</span>
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
          <NavLink to="/pantry"  onClick={() => setMenuOpen(false)}>Pantry</NavLink>
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

      {isSearchOpen && <SearchPanel onClose={() => setIsSearchOpen(false)} />}

      {
  isCartOpen && (

    <>

      <div
        className="cart-backdrop"
        onClick={() =>
          setIsCartOpen(false)
        }
      ></div>

      <CartSidebar
        setIsCartOpen={setIsCartOpen}
      />

    </>

  )
}

    </>
  );
}