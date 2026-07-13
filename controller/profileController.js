const User = require("../models/User");

const parseArrayField = (field) => {
  if (!field) return undefined;
  if (Array.isArray(field)) return field.map((item) => item.toString().trim()).filter(Boolean);
  return field
    .toString()
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = {};

    const stringFields = [
      "name",
      "branch",
      "college",
      "location",
      "year",
      "linkedin",
      "github",
      "profilePicture",
    ];

    stringFields.forEach((key) => {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    });

    if (req.body.skills !== undefined) {
      updates.skills = parseArrayField(req.body.skills);
    }

    if (req.body.projects !== undefined) {
      updates.projects = parseArrayField(req.body.projects);
    }

    if (req.body.achievements !== undefined) {
      updates.achievements = parseArrayField(req.body.achievements);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No profile fields provided for update",
      });
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const resumePath = req.file.path.replace(/\\/g, "/");

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { resume: resumePath },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      profile: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
