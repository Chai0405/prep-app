/* eslint-env node */

import mailTemplate from "../utils/mailTemplate.js";

const newsletterEmail = () => {

const content = `

<tr>
<td align="left" style="color:#ffffff;font-family:Inter, Arial, sans-serif;line-height:1.6">

<p style="margin-bottom:10px;font-size:16px;">
Hello,
</p>

<p style="color:#a6a6a6;font-size:14px;margin-bottom:12px;">
We’ve added new recipes and meal ideas to <b style="letter-spacing:1px;">PREP</b>.
</p>

<p style="color:#a6a6a6;font-size:14px;max-width:480px;">
From quick weekday meals to comforting weekend dishes, there’s always something new to explore.
Open PREP and discover recipes that make meal planning easier and more enjoyable.
</p>

</td>
</tr>

<tr>
<td align="center" style="padding:30px 0">

<a href="${process.env.CLIENT_URL}/recipes"
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

Explore Recipes

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

Thanks for being part of the PREP community.

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

return mailTemplate("What's new in PREP", content);

};

export default newsletterEmail;