/* eslint-env node */
import mailTemplate from "../utils/mailTemplate.js";

const welcomeEmail = (name) => {

const content = `

<tr>
<td align="left" style="color:#ffffff;font-family:Inter, Arial, sans-serif;line-height:1.6">

<p style="margin-bottom:10px;font-size:16px;">
Hi ${name},
</p>

<p style="color:#a6a6a6;font-size:14px;margin-bottom:12px;">
Welcome to <b style="letter-spacing:1px;">PREP</b>!
</p>

<p style="color:#a6a6a6;font-size:14px;max-width:480px;">
Your email has been successfully verified and your account is now active.
You can now start planning your weekly meals, explore recipes,
and generate grocery lists effortlessly.
</p>

<p style="color:#a6a6a6;font-size:14px;margin-top:10px;">
We’re excited to have you with us.
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

Start Exploring

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

Here's to simpler planning and delicious meals ahead.

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

return mailTemplate("Welcome to PREP", content);

};

export default welcomeEmail;