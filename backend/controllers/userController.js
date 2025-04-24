const User = require("../models/user.model.js");

exports.getUsers = async (req, res) => {
  try {
    const currentUserId = req.headers["x-user-id"];

    if (!currentUserId) {
      return res
        .status(400)
        .json({ message: "User ID not provided in headers" });
    }

    const users = await User.find({ _id: { $ne: currentUserId } }, "-password");

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};
