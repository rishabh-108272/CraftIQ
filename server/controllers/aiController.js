import OpenAI from "openai";
import sql from '../configs/db.js';
import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import axios from 'axios';
import Pdf from "pdf-parse/lib/pdf-parse.js";
import connectedCloudinary from "../configs/cloudinary.js";
import FormData from "form-data";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth; // ✅ fixed
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== 'premium' && free_usage >= 10) {
      return res.json({ success: false, message: "Limit reached. Upgrade to continue." });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    if (plan !== 'premium') {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 }
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== 'premium' && free_usage >= 10) {
      return res.json({ success: false, message: "Limit reached. Upgrade to continue." });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    if (plan !== 'premium') {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 }
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { prompt, publish } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== 'premium' && free_usage >= 10) {
      return res.json({ success: false, message: "This feature is for premium users only. Upgrade to continue." });
    }

    const form = new FormData();
    form.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      form,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API_KEY,
          ...form.getHeaders(),
        },
        responseType: 'arraybuffer',
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;
    const { secure_url } = await connectedCloudinary.uploader.upload(base64Image);

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth;
    const plan = req.plan;
    const free_usage = req.free_usage;
    const image = req.file;

    if (plan !== 'premium' && free_usage >= 10) {
      return res.json({ success: false, message: "This feature is for premium users only. Upgrade to continue." });
    }
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const { secure_url } = await connectedCloudinary.uploader.upload(base64Image, {
      transformation: [
        {
          effect: 'background_removal',
          background_removal: 'remove_the_background'
        }
      ]
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')
    `;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ----------------- Remove Object -----------------
export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== 'premium' && free_usage >= 10) {
      return res.json({ success: false, message: "This feature is for premium users only. Upgrade to continue." });
    }

const base64Image = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
const { public_id, secure_url } = await connectedCloudinary.uploader.upload(base64Image);

const image_url = cloudinary.url(public_id, {
  transformation: [{ effect: `gen_remove:${object}` }],
  resource_type: 'image',
});

  await sql`
  INSERT INTO creations (user_id, prompt, content, type)
  VALUES (${userId}, ${`Removed ${object} from image`}, ${image_url}, 'image')
`;

res.json({ success: true, content: image_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ----------------- Resume Review -----------------
export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth;
    const resume = req.file;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== 'premium' && free_usage >= 10) {
      return res.json({ success: false, message: "This feature is for premium users only. Upgrade to continue." });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({ success: false, message: "Resume file size exceeds allowed size (5MB)." });
    }

    const dataBuffer = resume.buffer
    const pdfData = await Pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')
    `;

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
