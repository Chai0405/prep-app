const API_URL = import.meta.env.VITE_API_URL;

/*
  Thin wrapper around fetch for the PREP backend.
  - prefixes the API base URL
  - sends the auth token (header) and cookie
  - JSON-encodes `body` when given
  Returns the raw Response, so callers check `res.ok` as usual.
*/
export const apiFetch = (path, { body, headers, ...options } = {}) => {
  const token = localStorage.getItem("token");

  return fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(body !== undefined && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
};
