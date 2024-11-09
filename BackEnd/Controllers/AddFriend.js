const User = require("../models/userSchema");

const addFriend = async (req, res) => {
  try {
    const { identifier, email } = req.body;

    // Find the user who initiated the friend request
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    // Find the friend user by their identifier
    const friend = await User.findOne({ identifier });
    if (!friend) {
      return res.status(404).json({ status: "error", message: "Friend not found" });
    }

    // Check if the friend is already added
    if (user.friends.some(f => f.email === friend.email)) {
      return res.status(400).json({ status: "error", message: "Friend already added" });
    }

    // Add friend to the user's friends array with name and identifier
    user.friends.push({
      name: friend.name,
      identifier: friend.identifier,
      email: friend.email
    });

    await user.save();

    res.status(200).json({ status: "success", message: "Friend added successfully" });
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ status: "error", message: "Failed to add friend" });
  }
};

module.exports = addFriend;
