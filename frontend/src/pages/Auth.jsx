import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { Link } from "react-router-dom";
import { apiFetch } from "../utils/api";

export default function Auth() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
  const res = await apiFetch("/api/auth/login", {
  method: "POST",
  body: { email, password }
});

const data = await res.json();

if (!res.ok) {
  throw new Error(data.message || "Login failed");
}

localStorage.setItem("token", data.token);

navigate("/dashboard", { replace: true });

} catch (err) {
  console.error("Login error:", err);
  setError(err.message || "Something went wrong");
}finally {
      setLoading(false);
    }
  };

  return (
  <div className="auth-page">

    {/* LEFT SIDE */}
    <div className="auth-image">
      <img src="/logo.png" alt="Prep Logo" className="auth-logo" />
      <div className="image-overlay">
        <h2>Plan beautifully.</h2>
        <p>From pantry to plate.</p>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="auth-form">
      <div className="form-box">
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Sign in to your Prep account</p>

        {error && (
          <p className="error-text">{error}</p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="forgot-wrap">
  <Link to="/forgot-password" className="forgot-link">
    Forgot password?
  </Link>
</div>

          <button className="primary-btn" disabled={loading}>
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>

        {/* SOCIAL LOGIN */}
        <div className="auth-extra">
          {/* Social sign-in is not implemented yet; kept visible but disabled */}
          <button className="google-btn" type="button" disabled>
            <img src="/google.png" alt="" />
            Google sign-in (coming soon)
          </button>

          <button className="facebook-btn" type="button" disabled>
            <img src="/facebook.png" alt="" />
            Facebook sign-in (coming soon)
          </button>

          <p className="switch-auth">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>
              Register
            </span>
          </p>
        </div>
      </div>
    </div>

  </div>
);
}