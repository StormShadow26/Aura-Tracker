const bcrypt = require('bcryptjs');
const User = require('../models/userSchema'); // Adjust path as needed

// Register Controller
const registerUser = async (req, res) => {
  const { name, email, password, yearOfStudy, department, college, phone } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      yearOfStudy,
      department,
      college,
      phone,
    });

    // Save user to database
    await newUser.save();
    res.status(201).json({ message: 'Registration successful!', userid: newUser._id,email:newUser.email });

  } catch (error) {
    res.status(500).json({ message: 'Registration failed.', error: error.message });
  }
};

module.exports = registerUser;
