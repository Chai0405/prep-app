/* eslint-env node */
import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

/*
  Sends one email. Provider is chosen from the environment:
  - BREVO_API_KEY set  -> Brevo (free plan can send to anyone once the
                          MAIL_FROM address is a verified sender in Brevo)
  - else RESEND_API_KEY -> Resend (without a verified domain, Resend only
                          delivers to the Resend account owner's address)
  Returns true when the provider accepted the email. Never throws, so a
  mail problem can't break registration or password reset.
*/

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

// "PREP <hello@example.com>" or "hello@example.com"
export const parseSender = (from = "") => {
  const match = from.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
  return match
    ? { name: match[1].replace(/^"|"$/g, "") || undefined, email: match[2].trim() }
    : { email: from.trim() };
};

const sendWithBrevo = async (to, subject, html) => {
  const res = await fetch(BREVO_URL, {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: parseSender(process.env.MAIL_FROM),
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    console.error(`Email failed (Brevo ${res.status}):`, body.message || body.code || "unknown error");
    return false;
  }

  return true;
};

// Created on first use, so a missing key disables email instead of
// crashing the whole server at startup
let resend;

const sendWithResend = async (to, subject, html) => {
  resend ??= new Resend(process.env.RESEND_API_KEY);

  const response = await resend.emails.send({
    from: process.env.MAIL_FROM,
    to: [to],
    subject,
    html
  });

  if (response.error) {
    console.error("Email failed (Resend):", response.error);
    return false;
  }

  return true;
};

const sendEmail = async (to, subject, html) => {

  if (!process.env.MAIL_FROM) {
    console.error("Email not sent: MAIL_FROM is not set");
    return false;
  }

  try {

    let sent;

    if (process.env.BREVO_API_KEY) {
      sent = await sendWithBrevo(to, subject, html);
    } else if (process.env.RESEND_API_KEY) {
      sent = await sendWithResend(to, subject, html);
    } else {
      console.error("Email not sent: set BREVO_API_KEY (or RESEND_API_KEY)");
      return false;
    }

    if (sent) console.log("Email sent");
    return sent;

  } catch (err) {

    console.error("Email send error:", err);
    return false;

  }

};

export default sendEmail;
