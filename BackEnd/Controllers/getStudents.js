// Import the User model
const User = require("../models/userSchema");

// Controller function to fetch users with role "Student" or null, returning only name, email, and identifier
const getStudents = async (req, res) => {
  try {
    console.log("Fetching students with role 'Student' or null"); // Debugging log

    // Fetch users with role "Student" or null, selecting only name, email, and identifier fields
    const users = await User.find(
      {
        $or: [
          { role: "Student" },
          { role: null }
        ]
      },
      'name email identifier' // Specify fields to return
    );

    console.log("Users fetched successfully:", users); // Debugging log

    // Send the found users in the response
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching students:", error); // Detailed error log
    res.status(500).json({
      status: "error",
      message: "Failed to fetch students",
    });
  }
};

module.exports = {
  getStudents,
};
