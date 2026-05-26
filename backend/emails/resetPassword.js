/* eslint-env node */

import mailTemplate from "../utils/mailTemplate.js";

const resetPassword = (link) => {

const content = `

<p style="margin-bottom:10px;font-size:16px;color:white;">
Hello,
</p>

<p style="color:#a6a6a6;font-size:14px;margin-bottom:12px;">
We received a request to reset your
<b style="letter-spacing:1px;">PREP</b>
account password.
</p>

<p style="color:#a6a6a6;font-size:14px;max-width:480px;">
If you made this request, click the button below to create a new password.
For security reasons, this link will expire in a few minutes.
</p>

<p style="color:#a6a6a6;font-size:15px;margin-top:10px;">
If you didn’t request a password reset, you can safely ignore this email.
</p>

<p style="
color:#bfbfbf;
font-size:13px;
margin-top:24px;
">
Your security matters to us.
</p>

<p style="
font-size:11px;
color:#777777;
margin-top:18px;
">
© ${new Date().getFullYear()} PREP.
All rights reserved.
</p>

`;





return mailTemplate(
"Reset your password",
content,
"Reset Password",
link
);

};

export default resetPassword;