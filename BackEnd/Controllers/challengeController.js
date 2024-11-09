// controllers/challengeController.js
const nodemailer = require("nodemailer");

// Configure nodemailer transporter (assuming your configuration is correct)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Controller to handle sending challenge email
exports.sendChallengeEmail = async (req, res) => {
  const { problemId, email } = req.body;

  try {
    // Compose the email options with HTML content
    const mailOptions = {
      from: `"Aura-Tracker Services" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "You’ve Been Challenged to Solve a Problem!",
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f9; border-radius: 8px; border: 1px solid #ccc;">
              <h2 style="color: #4CAF50; text-align: center;">🌟 Challenge Invitation</h2>
              <p style="font-size: 16px;">Hello!</p>
              <p style="font-size: 16px;">You have been invited to participate in a challenge! The problem ID for this challenge is <strong>${problemId}</strong>.</p>
              <p style="font-size: 16px;">Please visit the following link to view the problem and start competing:</p>
              <p style="font-size: 16px; text-align: center;">
                <a href="http://localhost:3000/question/${problemId}" style="text-decoration: none; background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 4px; font-weight: bold;">
                  Start Challenge
                </a>
              </p>
              <p style="font-size: 16px;">We wish you the best of luck!</p>
              <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;">
              <p style="font-size: 14px; color: #888; text-align: center;">
                This is an automated message. Please do not reply.
              </p>
            </div>
          </body>
        </html>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with success
    res.status(200).json({ status: "success", message: "Challenge sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ status: "error", message: "Failed to send challenge" });
  }
};
