const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }
    
    
    // Send response with user details including role
    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // Include role in the response
        yearOfStudy: user.yearOfStudy,
        department: user.department,
        college: user.college,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error, please try again later",
    });
  }
};

module.exports = loginUser;
