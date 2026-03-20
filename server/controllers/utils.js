const sharp = require("sharp");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const arrayStringified = (arr) => {
   if (!arr || !Array.isArray(arr)) return null;
   return JSON.stringify(arr);
}

const stringifiedArrayToArray = (str) => {
   if (!str || typeof str !== 'string') return null;
   try {
      const arr = JSON.parse(str);
      if (Array.isArray(arr)) return arr;
      return null;
   } catch (error) {
      return null;
   }
}


// Root folder of your project
const ROOT_DIR = process.cwd();

// Uploads folder and blur folder
const UPLOAD_DIR = path.join(ROOT_DIR, "public/uploads");
const BLUR_DIR = path.join(UPLOAD_DIR, "blur");
if (!fs.existsSync(BLUR_DIR)) fs.mkdirSync(BLUR_DIR, { recursive: true });

async function generateBlurImage(imageUrl) {
  try {
    // Fetch image data
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);

    // Generate filename
    const filename = `blur-${Date.now()}.webp`;
    const outputPath = path.join(BLUR_DIR, filename);

    // resize + blur
    await sharp(buffer)
      .resize(20) // placeholder blur
      .blur(10)
      .webp({ quality: 70 })
      .toFile(outputPath);

    // Return  URL
    const baseUrl = process.env.APP_URL.replace(/\/$/, "");
    return `${baseUrl}/uploads/blur/${filename}`;
  } catch (err) {
    console.error("Blur generation failed:", err);
    return null;
  }
}

module.exports = {
    arrayStringified,
    stringifiedArrayToArray,  generateBlurImage
}