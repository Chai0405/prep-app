import { useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../utils/api";
import "../styles/recipeRequest.css";

// "Can't find a recipe?" — logged-in users ask for one; the owner gets an email
export default function RecipeRequestForm() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(() => Boolean(localStorage.getItem("token")));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const res = await apiFetch("/api/recipe-requests", {
        method: "POST",
        body: { name, details },
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 401) {
        setLoggedIn(false);
        setStatus("idle");
        return;
      }

      if (!res.ok) {
        setStatus("error");
        setMessage(data.message || "Request failed. Please try again.");
        return;
      }

      setStatus("sent");
      setMessage(data.message);
      setName("");
      setDetails("");
    } catch {
      setStatus("error");
      setMessage("Request failed. Please check your connection and try again.");
    }
  };

  return (
    <section className="recipe-request" aria-labelledby="recipe-request-title">
      <div className="recipe-request-card">
        <h2 id="recipe-request-title">Can't find a recipe?</h2>
        <p className="recipe-request-sub">
          Tell us what you'd like to cook, and we'll add it to PREP.
        </p>

        {!loggedIn ? (
          <p className="recipe-request-login">
            <Link to="/auth">Log in</Link> to request a recipe.
          </p>
        ) : status === "sent" ? (
          <div className="recipe-request-done" role="status">
            <p>{message}</p>
            <button type="button" className="recipe-request-again" onClick={() => setStatus("idle")}>
              Request another recipe
            </button>
          </div>
        ) : (
          <form className="recipe-request-form" onSubmit={handleSubmit}>
            <label>
              <span>Recipe name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Paneer Tikka"
                minLength={2}
                maxLength={100}
                required
              />
            </label>

            <label>
              <span>Any details <em>(optional)</em></span>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="e.g. vegetarian, air-fryer, under 30 minutes"
                maxLength={1000}
                rows={3}
              />
            </label>

            {status === "error" && (
              <p className="recipe-request-error" role="alert">{message}</p>
            )}

            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Request recipe"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
