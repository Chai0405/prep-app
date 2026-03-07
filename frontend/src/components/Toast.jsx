import { useEffect } from "react";

export default function Toast({ message, setMessage }) {

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, setMessage]);

  if (!message) return null;

  return (
    <div className="toast">
      {message}
    </div>
  );
}