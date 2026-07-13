const express = require("express");
const { getStudents, getStudentById } = require("../controller/studentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getStudents);
router.get("/:id", protect, getStudentById);

module.exports = router;
