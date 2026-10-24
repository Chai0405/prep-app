import { useEffect } from "react";
import { Link } from "react-router-dom";

// Short message at the bottom of the screen; `action` adds a link, e.g. "View planner"
export default function Toast({ message, setMessage, action }) {

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, action ? 5000 : 3000);

    return () => clearTimeout(timer);
  }, [message, setMessage, action]);

  if (!message) return null;

  return (
    <div className="toast" role="status">
      <span>{message}</span>
      {action && (
        <Link to={action.to} className="toast-action" onClick={() => setMessage("")}>
          {action.label}
        </Link>
      )}
    </div>
  );
}
