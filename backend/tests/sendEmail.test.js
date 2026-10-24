/* eslint-env node */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// setup.js replaces sendEmail with a stub for every other test; here we
// test the real module, with the network (fetch) and Resend faked
vi.unmock("../utils/sendEmail.js");

const resendSend = vi.fn();
vi.mock("resend", () => ({
  Resend: class { constructor() { this.emails = { send: resendSend }; } },
}));

const { default: sendEmail, parseSender } = await import("../utils/sendEmail.js");

const ENV_KEYS = ["BREVO_API_KEY", "RESEND_API_KEY", "MAIL_FROM"];
let savedEnv;

beforeEach(() => {
  savedEnv = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
  ENV_KEYS.forEach((k) => delete process.env[k]);
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "log").mockImplementation(() => {});
  resendSend.mockReset();
});

afterEach(() => {
  ENV_KEYS.forEach((k) => (savedEnv[k] === undefined ? delete process.env[k] : (process.env[k] = savedEnv[k])));
  vi.unstubAllGlobals();
});

describe("parseSender", () => {
  it("reads 'Name <email>' and plain addresses", () => {
    expect(parseSender("PREP <hello@example.com>")).toEqual({ name: "PREP", email: "hello@example.com" });
    expect(parseSender('"PREP App" <a@b.co>')).toEqual({ name: "PREP App", email: "a@b.co" });
    expect(parseSender("hello@example.com")).toEqual({ email: "hello@example.com" });
  });
});

describe("sendEmail with Brevo", () => {
  it("posts the email to Brevo with the key and sender", async () => {
    process.env.BREVO_API_KEY = "xkeysib-test";
    process.env.RESEND_API_KEY = "re_should_not_be_used";
    process.env.MAIL_FROM = "PREP <owner@gmail.com>";
    const fetchMock = vi.fn(async () => new Response('{"messageId":"<1@brevo>"}', { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);

    const ok = await sendEmail("friend@gmail.com", "Verify your email", "<p>hi</p>");

    expect(ok).toBe(true);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.brevo.com/v3/smtp/email");
    expect(options.headers["api-key"]).toBe("xkeysib-test");
    expect(JSON.parse(options.body)).toEqual({
      sender: { name: "PREP", email: "owner@gmail.com" },
      to: [{ email: "friend@gmail.com" }],
      subject: "Verify your email",
      htmlContent: "<p>hi</p>",
    });
    expect(resendSend).not.toHaveBeenCalled(); // Brevo wins when both are set
  });

  it("returns false (and does not throw) when Brevo refuses", async () => {
    process.env.BREVO_API_KEY = "xkeysib-test";
    process.env.MAIL_FROM = "PREP <unverified@gmail.com>";
    vi.stubGlobal("fetch", vi.fn(async () =>
      new Response('{"code":"unauthorized","message":"Sender not valid"}', { status: 400 })));

    await expect(sendEmail("friend@gmail.com", "s", "h")).resolves.toBe(false);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("Brevo 400"), "Sender not valid");
  });

  it("returns false when the network is down", async () => {
    process.env.BREVO_API_KEY = "xkeysib-test";
    process.env.MAIL_FROM = "owner@gmail.com";
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ECONNRESET"); }));
    await expect(sendEmail("friend@gmail.com", "s", "h")).resolves.toBe(false);
  });
});

describe("sendEmail fallback and configuration", () => {
  it("uses Resend when no Brevo key is set (today's setup)", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.MAIL_FROM = "PREP <onboarding@resend.dev>";
    resendSend.mockResolvedValue({ data: { id: "1" }, error: null });

    expect(await sendEmail("me@gmail.com", "s", "h")).toBe(true);
    expect(resendSend).toHaveBeenCalledWith(expect.objectContaining({ to: ["me@gmail.com"] }));
  });

  it("reports Resend's refusal as a failure", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.MAIL_FROM = "PREP <onboarding@resend.dev>";
    resendSend.mockResolvedValue({ data: null, error: { message: "You can only send testing emails to your own email address" } });

    expect(await sendEmail("friend@gmail.com", "s", "h")).toBe(false);
  });

  it("sends nothing without a sender address or any provider key", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    process.env.BREVO_API_KEY = "xkeysib-test";
    expect(await sendEmail("a@b.co", "s", "h")).toBe(false); // no MAIL_FROM

    delete process.env.BREVO_API_KEY;
    process.env.MAIL_FROM = "owner@gmail.com";
    expect(await sendEmail("a@b.co", "s", "h")).toBe(false); // no provider

    expect(fetchMock).not.toHaveBeenCalled();
    expect(resendSend).not.toHaveBeenCalled();
  });
});
