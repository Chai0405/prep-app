/* eslint-env node */
import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {

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