import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
  setError("Passwords do not match");
  return;
}

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
  setError(data.message || "Registration failed");
  setLoading(false);
  return;
}

      navigate("/auth");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container register">
      <div className="auth-left">
        <img src="/logo.png" className="auth-logo" alt="Prep logo" />
        <div className="left-text">
          <h2>Plan beautifully.</h2>
          <p>From pantry to plate.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <h1>Create your account</h1>

          {error && (
  <p className="error-text">{error}</p>
)}

          <form onSubmit={handleRegister}>
            <input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              minLength="10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              autoComplete="new-password"
              placeholder="Confirm Password"
              minLength="10"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            <button type="submit" disabled={loading} className="primary-btn">
              {loading ? "CREATING..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <p className="register-footer">
            Already have an account?{" "}
            <span onClick={() => navigate("/auth")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}