const mailTemplate = (title, message, buttonText, buttonLink) => {
return `

<!DOCTYPE html>
<html style="background:#000000">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- tell mail apps this email is designed dark, so they don't invert it -->
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
</head>

<body bgcolor="#000000" style="background:#000000;margin:0;padding:0;font-family:Inter,Arial">

<!-- Gmail drops <body> styles, so the black background lives on this table -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#000000"
style="background:#000000;background-color:#000000;width:100%">
<tr>
<td align="center" bgcolor="#000000" style="background:#000000;padding:40px 16px">

<table width="520" cellpadding="0" cellspacing="0" border="0" bgcolor="#0b0b0b"
style="background:#0b0b0b;background-color:#0b0b0b;border-radius:8px;padding:40px;border:1px solid #1f1f1f;max-width:100%">

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

${message}

${buttonLink ? `
<table cellpadding="0" cellspacing="0" style="margin:28px auto 0 auto">
<tr>
<td align="center">
<a href="${buttonLink}"
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
${buttonText}
</a>
</td>
</tr>
</table>
<p style="font-size:12px;color:#8a8a8a;margin-top:18px;word-break:break-all;">
Or paste this link into your browser:<br>${buttonLink}
</p>
` : ""}

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