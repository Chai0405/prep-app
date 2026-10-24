import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";

export default function VerifyEmail() {

  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");

  useEffect(() => {

    const verifyEmail = async () => {
      try {

        const res = await apiFetch(`/api/auth/verify-email/${token}`);

        if (!res.ok) throw new Error("Verification failed");

        setStatus("success");

        setTimeout(() => {
          navigate("/auth");
        }, 2000);

      } catch (err) {

        console.error("Verification error:", err);
        setStatus("error");

      }
    };

    verifyEmail();

  }, [token, navigate]);

  return (
    <div style={{ padding: "100px", textAlign: "center" }}>
      
      {status === "loading" && (
        <h2>Verifying your email...</h2>
      )}

      {status === "success" && (
        <h2>Email verified successfully! Redirecting to login...</h2>
      )}

      {status === "error" && (
        <h2>Verification failed or link expired.</h2>
      )}

    </div>
  );
}