const express = require("express");
const path = require("path");
const multer = require("multer");
const { getProfile, updateProfile, uploadResume } = require("../controller/profileController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads", "resumes"));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
    cb(null, `${req.user._id}_${timestamp}_${safeName}`);
  },
});

const resumeUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /\.(pdf|doc|docx)$/i;
    if (!allowedExtensions.test(file.originalname)) {
      return cb(new Error("Resume must be a PDF, DOC, or DOCX file"));
    }
    cb(null, true);
  },
});

router.route("/").get(protect, getProfile).put(protect, updateProfile);
router.post("/resume", protect, resumeUpload.single("resume"), uploadResume);

module.exports = router;
