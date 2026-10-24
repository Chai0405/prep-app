import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Profile from "./Profile";

// jsdom can't decode images, so stand in for the canvas resize
vi.mock("../utils/avatar", async (importOriginal) => ({
  ...(await importOriginal()),
  resizeAvatar: vi.fn(async () => "data:image/jpeg;base64,/9j/AAAA"),
}));

const json = (body, status = 200) => new Response(JSON.stringify(body), { status });

const setup = (deleteResponse) => {
  localStorage.setItem("token", "session-token");
  const fetchMock = vi.fn(async (url, options = {}) => {
    if (options.method === "DELETE") return deleteResponse();
    return json({ name: "Test User", email: "user@example.com" });
  });
  vi.stubGlobal("fetch", fetchMock);

  render(
    <MemoryRouter initialEntries={["/profile"]}>
      <Routes>
        <Route path="/" element={<p>home page</p>} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </MemoryRouter>
  );
  return fetchMock;
};

describe("Profile › delete account", () => {
  it("needs the password and the word DELETE before it can be confirmed", async () => {
    const user = userEvent.setup();
    setup(() => json({ success: true }));

    await user.click(await screen.findByRole("button", { name: "Delete Account" }));
    const confirm = screen.getByRole("button", { name: "Delete permanently" });
    expect(confirm).toBeDisabled();

    await user.type(screen.getByLabelText("Current password"), "secret-password");
    await user.type(screen.getByLabelText("Type DELETE to confirm"), "delete");
    expect(confirm).toBeDisabled();

    await user.clear(screen.getByLabelText("Type DELETE to confirm"));
    await user.type(screen.getByLabelText("Type DELETE to confirm"), "DELETE");
    expect(confirm).toBeEnabled();
  });

  it("deletes, signs out locally and leaves the profile", async () => {
    const user = userEvent.setup();
    const fetchMock = setup(() => json({ success: true }));

    await user.click(await screen.findByRole("button", { name: "Delete Account" }));
    await user.type(screen.getByLabelText("Current password"), "secret-password");
    await user.type(screen.getByLabelText("Type DELETE to confirm"), "DELETE");
    await user.click(screen.getByRole("button", { name: "Delete permanently" }));

    expect(await screen.findByText("home page")).toBeInTheDocument();
    expect(localStorage.getItem("token")).toBeNull();

    const [url, options] = fetchMock.mock.calls.find(([, o]) => o?.method === "DELETE");
    expect(url).toBe("http://api.test/api/user");
    expect(JSON.parse(options.body)).toEqual({ password: "secret-password", confirm: "DELETE" });
  });

  it("keeps the session and shows the error when deletion is refused", async () => {
    const user = userEvent.setup();
    setup(() => json({ message: "Wrong password" }, 400));

    await user.click(await screen.findByRole("button", { name: "Delete Account" }));
    await user.type(screen.getByLabelText("Current password"), "bad-password");
    await user.type(screen.getByLabelText("Type DELETE to confirm"), "DELETE");
    await user.click(screen.getByRole("button", { name: "Delete permanently" }));

    expect(await screen.findByText("Wrong password")).toBeInTheDocument();
    expect(localStorage.getItem("token")).toBe("session-token");
  });
});

describe("Profile › avatar", () => {
  const setupAvatar = (putResponse) => {
    localStorage.setItem("token", "session-token");
    const fetchMock = vi.fn(async (url, options = {}) =>
      options.method === "PUT" ? putResponse() : json({ name: "Test User", email: "user@example.com" })
    );
    vi.stubGlobal("fetch", fetchMock);
    render(<MemoryRouter><Profile /></MemoryRouter>);
    return fetchMock;
  };

  it("rejects unsupported files without uploading", async () => {
    const user = userEvent.setup({ applyAccept: false });
    const fetchMock = setupAvatar(() => json({}));
    await screen.findByText("Test User");

    await user.upload(screen.getByLabelText("Change Avatar"), new File(["<svg/>"], "x.svg", { type: "image/svg+xml" }));

    expect(await screen.findByText(/PNG, JPEG, WebP or GIF/)).toBeInTheDocument();
    expect(fetchMock.mock.calls.some(([, o]) => o?.method === "PUT")).toBe(false);
  });

  it("uploads the resized image and shows it", async () => {
    const user = userEvent.setup();
    const fetchMock = setupAvatar(() => json({ name: "Test User", avatar: "data:image/jpeg;base64,/9j/AAAA" }));
    await screen.findByText("Test User");

    await user.upload(screen.getByLabelText("Change Avatar"), new File(["x"], "me.png", { type: "image/png" }));

    expect(await screen.findByAltText("Avatar")).toHaveAttribute("src", "data:image/jpeg;base64,/9j/AAAA");
    const put = fetchMock.mock.calls.find(([, o]) => o?.method === "PUT");
    expect(JSON.parse(put[1].body)).toEqual({ avatar: "data:image/jpeg;base64,/9j/AAAA" });
  });

  it("shows the server's reason when an upload is refused", async () => {
    const user = userEvent.setup();
    setupAvatar(() => new Response("<html>Payload Too Large</html>", { status: 413 }));
    await screen.findByText("Test User");

    await user.upload(screen.getByLabelText("Change Avatar"), new File(["x"], "me.png", { type: "image/png" }));

    expect(await screen.findByText("Avatar upload failed")).toBeInTheDocument();
  });
});
