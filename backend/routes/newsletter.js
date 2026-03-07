import express from "express";
import Newsletter from "../models/Newsletter.js";
import sendEmail from "../utils/sendEmail.js";
import newsletterEmail from "../emails/newsletterEmail.js";

const router = express.Router();

router.post("/", async (req,res)=>{

const { email } = req.body;

if(!email)
return res.status(400).json({message:"Email required"});

const existing = await Newsletter.findOne({email});

if(existing)
return res.status(400).json({message:"Already subscribed"});

await Newsletter.create({email});

const html = newsletterEmail();

await sendEmail(email,"Welcome to PREP",html);

res.json({message:"Welcome. Expect seasonal notes and curated ideas."});

});

export default router;