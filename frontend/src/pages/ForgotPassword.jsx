import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/forgotPassword.css";
import { apiFetch } from "../utils/api";

export default function ForgotPassword() {

  const [email,setEmail] = useState("");
  const [message,setMessage] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try{

      const res = await apiFetch("/api/auth/forgot-password",{
        method:"POST",
        body:{ email }
      });

      if (!res.ok) throw new Error("Request failed");

      setMessage("A reset link has been sent to your email. Kindly check");

    }catch(err){
console.error("Forgot password error",err)
      setMessage("Something went wrong. Please try again.");

    }

  };

  return (

    <div className="forgot-page">

      {/* LOGO */}
      <Link to="/" className="forgot-logo">
        <img src="/logo.png" alt="Prep"/>
      </Link>

      {/* LEFT IMAGE */}
      <div className="forgot-left">
        <img src="/forgot-password.png" alt="Food prep"/>
      </div>

      {/* RIGHT SIDE */}
      <div className="forgot-right">

        <div className="forgot-box">

          <h2>Reset your password</h2>

          <p className="forgot-sub">
            Enter your email and we'll send you a reset link.
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

            <button type="submit">
              Send Reset Link
            </button>

          </form>

          {message && (
            <p className="forgot-message">{message}</p>
          )}

          <div className="forgot-footer">
            <Link to="/auth">Back to login</Link>
          </div>

        </div>

      </div>

    </div>
  );
}