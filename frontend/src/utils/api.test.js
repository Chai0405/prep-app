import { describe, it, expect, vi } from "vitest";
import { apiFetch } from "./api";

describe("apiFetch", () => {
  it("prefixes the API URL and sends the token, cookie and JSON body", async () => {
    const fetchMock = vi.fn(async () => new Response("{}"));
    vi.stubGlobal("fetch", fetchMock);
    localStorage.setItem("token", "abc");

    await apiFetch("/api/x", { method: "POST", body: { a: 1 } });

    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("http://api.test/api/x");
    expect(options.credentials).toBe("include");
    expect(options.headers.Authorization).toBe("Bearer abc");
    expect(options.headers["Content-Type"]).toBe("application/json");
    expect(options.body).toBe('{"a":1}');
  });

  it("omits auth and content-type when not needed", async () => {
    const fetchMock = vi.fn(async () => new Response("{}"));
    vi.stubGlobal("fetch", fetchMock);

    await apiFetch("/api/recipes");

    const options = fetchMock.mock.calls[0][1];
    expect(options.headers).toEqual({});
    expect(options.body).toBeUndefined();
  });
});
