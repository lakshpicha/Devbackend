const User = require("../models/User");

const buildStudentQuery = (query = {}) => {
  const filters = [];

  if (query.skills) {
    query.skills
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .forEach((skill) => {
        filters.push({ skills: { $elemMatch: { $regex: new RegExp(skill, "i") } } });
      });
  }

  if (query.branch) {
    filters.push({ branch: { $regex: new RegExp(query.branch, "i") } });
  }

  if (query.year) {
    filters.push({ year: { $regex: new RegExp(query.year, "i") } });
  }

  if (query.college) {
    filters.push({ college: { $regex: new RegExp(query.college, "i") } });
  }

  if (query.location) {
    filters.push({ location: { $regex: new RegExp(query.location, "i") } });
  }

  return filters.length > 0 ? { $and: filters } : {};
};

exports.buildStudentQuery = buildStudentQuery;

exports.getStudents = async (req, res) => {
  try {
    const query = buildStudentQuery(req.query);

    const students = await User.find(query).select("-password").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select("-password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
