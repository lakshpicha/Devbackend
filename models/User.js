const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    phonenumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      validate: {
        validator: function (v) {
          return /^[6-9]\d{9}$/.test(v); // Indian phone number
        },
        message: "Please enter a valid 10-digit Indian phone number",
      },
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: function (value) {
          // At least 1 uppercase, 1 lowercase, 1 number, 1 special character
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/.test(
            value
          );
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    },

    branch: {
      type: String,
      trim: true,
      maxlength: [100, "Branch cannot exceed 100 characters"],
    },

    college: {
      type: String,
      trim: true,
      maxlength: [150, "College cannot exceed 150 characters"],
    },

    location: {
      type: String,
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
    },

    year: {
      type: String,
      trim: true,
      maxlength: [10, "Year cannot exceed 10 characters"],
    },

    skills: {
      type: [String],
      default: [],
    },

    projects: {
      type: [String],
      default: [],
    },

    achievements: {
      type: [String],
      default: [],
    },

    linkedin: {
      type: String,
      trim: true,
    },

    github: {
      type: String,
      trim: true,
    },

    profilePicture: {
      type: String,
      trim: true,
    },

    resume: {
      type: String,
      trim: true,
    }, 
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);