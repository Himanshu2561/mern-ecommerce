import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
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
  "/:id",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      res.status(404).json({ message: "No file uploaded" });
    } else {
      const product = await Product.findById(req.params.id);

      if (product.image.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id); // Delete the image using the public_id
      }

      // Convert the buffer to a readable stream using 'stream' module
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "mern_products",
          allowed_formats: ["jpg", "jpeg", "png"],
          width: 1440,
          crop: "scale",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.log(error);
            throw new Error("Image error");
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
    }
  })
);

export default router;
