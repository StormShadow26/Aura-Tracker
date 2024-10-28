const bcrypt = require('bcryptjs');
const User = require('../models/userSchema'); // Adjust path as needed

// Register Controller
const registerUser = async (req, res) => {
  const { 
    name, 
    email, 
    password, 
    yearOfStudy, 
    department, 
    college, 
    phone, 
    assignments, 
    classes, 
    weeksclasses, 
    projects, 
    timetable 
  } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with either provided values or defaults
    const newUser = new User({
      name: name || "Anonymous",
      email,
      password: hashedPassword,
      yearOfStudy: yearOfStudy || "1",
      department: department || "General Studies",
      college: college || "Unknown College",
      phone: phone || null,
      assignments: assignments || { done: 0, total: 0 },
      classes: classes || { attended: 0, total: 0 },
      weeksclasses: weeksclasses || { attended: 0, total: 0 },
      projects: projects || { completed: 0, total: 0 },
      timetable: timetable || []
    });

    // Save user to database
    await newUser.save();
    res.status(201).json({ message: 'Registration successful!', userid: newUser._id, email: newUser.email });

  } catch (error) {
    res.status(500).json({ message: 'Registration failed.', error: error.message });
  }
};

module.exports = registerUser;
