const bcrypt = require('bcryptjs');
const User = require("../models/userSchema"); // Adjust path as needed

const submitUserDetails = async (req, res) => {
  const { email, name, yearOfStudy, department, college, phone, password } = req.body;

  try {
    // Hash password if provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    // Check if a user with the provided email exists
    let user = await User.findOne({ email });

    if (!user) {
      // If no user is found, create a new user with default values
      user = new User({
        name: name || "Anonymous",
        email,
        password: hashedPassword,
        yearOfStudy: yearOfStudy || "1",
        department: department || "General Studies",
        college: college || "Unknown College",
        phone: phone || null,
        assignments: { done: 0, total: 0 },
        classes: { attended: 0, total: 0 },
        weeksclasses: { attended: 0, total: 0 },
        projects: { completed: 0, total: 0 },
        timetable: [],
      });

      await user.save();
      return res.status(201).json({ message: "New user created successfully!" });
    }

    // Check if the phone number already exists for another user
    const existingUser = await User.findOne({ phone });
    if (existingUser && existingUser.email !== email) {
      return res.status(409).json({
        message: "A user with this phone number already exists.",
      });
    }

    // Update the user's details if they already exist
    user.name = name || user.name;
    user.yearOfStudy = yearOfStudy || user.yearOfStudy;
    user.department = department || user.department;
    user.college = college || user.college;
    user.phone = phone || user.phone;

    // Update password if provided and not already set
    if (password && !user.password) {
      user.password = hashedPassword;
    }

    await user.save();
    res.status(200).json({ message: "User details updated successfully!" });
    console.log("User details:", user);
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({
      message: "Failed to update user details.",
      error: error.message,
    });
  }
};

module.exports = submitUserDetails;
