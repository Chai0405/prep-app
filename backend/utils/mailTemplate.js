const mailTemplate = (title, message, buttonText, buttonLink) => {
return `

<!DOCTYPE html>
<html>

<body style="background:#000000;margin:0;padding:40px;font-family:Inter,Arial">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="520" cellpadding="0" cellspacing="0"
style="background:#0b0b0b;border-radius:8px;padding:40px;border:1px solid #1f1f1f">

<tr>
<td align="center">

<img
src="https://res.cloudinary.com/dgp8vhtun/image/upload/logo_gec5gr.png"
width="60"
style="margin-bottom:24px"
/>

<h2 style="
font-family:Playfair Display,serif;
font-weight:500;
color:white;
margin-bottom:14px;
">
${title}
</h2>

<p style="
color:#b3b3b3;
font-size:14px;
line-height:1.6;
margin-bottom:30px;
">
${message}
</p>

<a href="${buttonLink}"
style="
display:inline-block;
background:white;
color:black;
padding:12px 24px;
border-radius:4px;
text-decoration:none;
font-size:14px;
font-weight:500;
">
${buttonText}
</a>

<!-- divider -->

<hr style="
border:none;
border-top:1px solid #1f1f1f;
margin:35px 0 20px 0;
width:80%;
">

<p style="
font-size:12px;
color:#8a8a8a;
margin-bottom:6px;
">
If you have any questions, feel free to reach out.
</p>

<p style="
font-size:11px;
color:#6b6b6b;
">
© ${new Date().getFullYear()} PREP • From pantry to plate
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>

</html>
`;
};

export default mailTemplate;