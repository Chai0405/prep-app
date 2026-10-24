/* eslint-env node */
import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

// Created on first use, so a missing key disables email instead of
// crashing the whole server at startup
let resend;

const sendEmail = async (to, subject, html) => {

if (!process.env.RESEND_API_KEY) {
console.error("Email not sent: RESEND_API_KEY is not set");
return;
}

resend ??= new Resend(process.env.RESEND_API_KEY);

try {

const response = await resend.emails.send({
from: process.env.MAIL_FROM,
to: [to],
subject,
html
});

if(response.error){
  console.error("Email failed:", response.error);
} else {
  console.log("Email sent");
}

} catch (err) {

console.error("Email send error:", err);

}

};

export default sendEmail;