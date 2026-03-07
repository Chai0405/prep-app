import mailTemplate from "../utils/mailTemplate.js";

const verifyEmail = (name, link) => {

const content = `

<tr>
<td align="left" style="color:#ffffff;font-family:Inter, Arial, sans-serif;line-height:1.6">

<p style="margin-bottom:10px;font-size:16px;">
Hi ${name},
</p>

<p style="color:#a6a6a6;font-size:14px;margin-bottom:12px;">
We're excited to have you here!
</p>

<p style="color:#a6a6a6;font-size:14px;max-width:480px;">
Before we start organizing your weekly meals and grocery lists,
we just need to confirm that this email belongs to you.
Just click the button below and you're all set.
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

Verify Email

</a>

</td>
</tr>

<tr>
<td align="center">

<p style="
color:#bfbfbf;
font-size:14px;
font-family:Inter, Arial, sans-serif;
">

If you already have created the account, you can safely ignore this email.

</p>

</td>
</tr>

<tr>
<td align="center" style="padding-top:20px;">

<p style="
font-size:11px;
color:#bfbfbf;
font-family:Inter, Arial, sans-serif;
text-align:center;
">

© ${new Date().getFullYear()} PREP. All rights reserved.

</p>

</td>
</tr>



`;

return mailTemplate("Welcome to Prep", content);

};

export default verifyEmail;