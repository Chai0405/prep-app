import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import LoadingState from "./LoadingState";

export default function ProtectedRoute({ children }) {

  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {

    const checkAuth = async () => {

      try {

        if (!localStorage.getItem("token")) {
          setAuthenticated(false);
          return;
        }

        const res = await apiFetch("/api/auth/me");

        setAuthenticated(res.ok);

      } catch {
        setAuthenticated(false);
      }

    };

    checkAuth();

  }, []);

  if (authenticated === null) {
    return <LoadingState />;
  }

  return authenticated ? children : <Navigate to="/auth" replace />;

}