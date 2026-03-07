/* eslint-env node */

import mailTemplate from "../utils/mailTemplate.js";

const resetPassword = (link) => {

const content = `
<tr>
<td align="left" style="color:#ffffff;font-family:Inter, Arial, sans-serif;line-height:1.6">

<p style="margin-bottom:10px;font-size:16px;">
Hello,
</p>

<p style="color:#a6a6a6;font-size:14px;margin-bottom:12px;">
We received a request to reset your <b style="letter-spacing:1px;">PREP</b> account password.
</p>

<p style="color:#a6a6a6;font-size:14px;max-width:480px;">
If you made this request, click the button below to create a new password.
For security reasons, this link will expire in a few minutes.
</p>

<p style="color:#a6a6a6;font-size:15px;margin-top:10px;">
If you didn’t request a password reset, you can safely ignore this email.
</p>

</td>
</tr>

<tr>
<td align="center" style="padding:30px 0">

<a href="${link}"
style="
display:inline-block;
padding:16px 42px;
color:#ffffff;
text-decoration:none;
font-weight:500;
border:1px solid #ffffff;
background:#000000;
font-family:Inter, Arial, sans-serif;
">

Reset password

</a>

</td>
</tr>

<tr>
<td align="center">

<p style="
color:#bfbfbf;
font-size:13px;
font-family:Inter, Arial, sans-serif;
">

Your security matters to us.

</p>

</td>
</tr>

<tr>
<td align="center" style="padding-top:20px;">

<p style="
font-size:11px;
color:#777777;
font-family:Inter, Arial, sans-serif;
text-align:center;
">

© ${new Date().getFullYear()} PREP. All rights reserved.

</p>

</td>
</tr>
`;





return mailTemplate(
"Reset your password",
content,
"Reset Password",
link
);

};

export default resetPassword;