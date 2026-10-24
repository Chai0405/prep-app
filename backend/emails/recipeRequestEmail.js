/* eslint-env node */
import mailTemplate from "../utils/mailTemplate.js";
import escapeHtml from "../utils/escapeHtml.js";

// Sent to the PREP owner whenever a user requests a recipe
const recipeRequestEmail = ({ recipeName, details, userName, userEmail, requestedAt }) => {

const row = (label, value) => `
<tr>
<td style="color:#8a8a8a;font-size:13px;padding:6px 12px 6px 0;vertical-align:top;white-space:nowrap">${label}</td>
<td style="color:#ffffff;font-size:14px;padding:6px 0;line-height:1.5">${value}</td>
</tr>`;

const content = `

<p style="color:#a6a6a6;font-size:14px;margin-bottom:18px;">
A user asked for a recipe that isn't on PREP yet.
</p>

<table cellpadding="0" cellspacing="0" style="margin:0 auto 8px auto;text-align:left;font-family:Inter, Arial, sans-serif">
${row("Recipe", `<b>${escapeHtml(recipeName)}</b>`)}
${row("Details", details ? escapeHtml(details).replace(/\n/g, "<br>") : "<span style=\"color:#6b6b6b\">None given</span>")}
${row("From", `${escapeHtml(userName)} &lt;${escapeHtml(userEmail)}&gt;`)}
${row("Requested", escapeHtml(requestedAt))}
</table>

<p style="color:#8a8a8a;font-size:12px;margin-top:18px;">
Reply to this person at ${escapeHtml(userEmail)} if you need more details.
</p>

`;

return mailTemplate(
"New recipe request",
content
);

};

export default recipeRequestEmail;
