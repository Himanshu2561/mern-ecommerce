import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import asyncHandler from "../middleware/asyncHandler.js";
dotenv.config();
const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup
const upload = multer(); // Initialize multer without storage (store in memory)

// Upload route
router.post(
  "/",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      res.status(404).json({ message: "No file uploaded" });
    } else {
      try {
        // Convert the buffer to a readable stream using 'stream' module
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "mern_products",
            allowed_formats: ["jpg", "jpeg", "png"],
            width: 500,
            crop: "scale",
            resource_type: 'image',
          },
          (error, result) => {
            if (error) {
              console.log(error);
              throw new Error("Server Error");
            } else {
              res.status(201).json({
                message: "Image uploaded",
                public_id: result.public_id,
                url: result.secure_url,
              }); // Return Cloudinary image URL
            }
          }
        );

        // Pipe the buffer to the stream
        stream.end(req.file.buffer);
      } catch (error) {
        console.log(error);
        throw new Error("Some error occured");
      }
    }
  })
);

export default router;
