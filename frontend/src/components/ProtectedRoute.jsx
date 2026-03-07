import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {

  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {

    const checkAuth = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          setAuthenticated(false);
          return;
        }

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setAuthenticated(res.ok);

      } catch (err) {
        setAuthenticated(false);
      }

    };

    checkAuth();

  }, []);

  if (authenticated === null) {
    return <div>Loading...</div>;
  }

  return authenticated ? children : <Navigate to="/auth" replace />;

}