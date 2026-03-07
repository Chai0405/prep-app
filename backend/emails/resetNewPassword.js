/* eslint-env node */
import mailTemplate from "../utils/mailTemplate.js";

const resetNewPassword = (name) => {

const message = `

<tr>
<td align="left" style="color:#ffffff;font-family:Inter, Arial, sans-serif;line-height:1.6">

<p style="margin-bottom:10px;font-size:16px;">
Hi ${name},
</p>

<p style="color:#a6a6a6;font-size:14px;margin-bottom:12px;">
Your <b style="letter-spacing:1px;">PREP</b> account password has been successfully updated.
</p>

<p style="color:#a6a6a6;font-size:14px;max-width:480px;">
If you made this change, you can now log in with your new password.
</p>

<p style="color:#a6a6a6;font-size:15px;margin-top:10px;">
If you did not make this change, please reset your password immediately
or contact support.
</p>

</td>
</tr>

<tr>
<td align="center" style="padding:30px 0">

<a href="${process.env.CLIENT_URL}/auth"
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

Login to PREP

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
"Password Updated",
message,
"Go to Login",
`${process.env.CLIENT_URL}/login`
);

};

export default resetNewPassword;