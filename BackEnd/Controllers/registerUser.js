const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Checking if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Create new user with OTP and unverified status
    const newUser = new User({
      name: "Anonymous",
      email,
      password: hashedPassword,
      yearOfStudy: "1",

      department: "General Studies",
      college: "Unknown College",
      phone: null,
      assignments: { done: 0, total: 0 },
      classes: { attended: 0, total: 0 },
      weeksclasses: { attended: 0, total: 0 },
      projects: { completed: 0, total: 0 },
      timetable: [],
      otp,
      otpExpiresAt,
      isVerified: false,
      quiz: {
        questionsAttempted: 0,
        questionsCorrect: 0,
      },
      problemSolving: {
        solved: 0,
      },
      contests: {
        given: 0,
      },
      sessions: {
        count: 0,
      },
      AnalysisOfAlgorithms:{
        totalClass:0,
        attendedClass:0
      },
      OperationResearch:{
        totalClass:0,
        attendedClass:0
      },
      ComputerArchitecture:{
        totalClass:0,
        attendedClass:0
      },
      Oops:{
        totalClass:0,
        attendedClass:0
      },
      AutomataTheory:{
        totalClass:0,
        attendedClass:0
      },
    });

    await newUser.save();

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send OTP via email with HTML content
    await transporter.sendMail({
      from: `"Aura-Tracker Services" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Aura-Tracker OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #4CAF50; text-align: center;">Welcome to Aura-Tracker!</h2>
          <p>Dear User,</p>
          <p>Thank you for registering with Aura-Tracker. To complete your registration, please verify your email with the OTP code below:</p>
          <div style="background-color: #f4f4f9; padding: 10px; border-radius: 5px; text-align: center; font-size: 18px; font-weight: bold; color: #333;">
            ${otp}
          </div>
          <p style="font-size: 14px; color: #888;">(This OTP is valid for 10 minutes)</p>
          <p>Best regards,<br>The Aura-Tracker Team</p>
          <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 12px; color: #999; text-align: center;">
            This email was sent automatically. Please do not reply to this email.
          </p>
        </div>
      `,
    });

    res
      .status(201)
      .json({
        message: "OTP sent to your email. Verify to complete registration.",
        userid: newUser._id,
      });
  } catch (error) {
    console.error("Error during registration:", error); // Log detailed error
    res
      .status(500)
      .json({ message: "Registration failed.", error: error.message });
  }
};

module.exports = registerUser;
