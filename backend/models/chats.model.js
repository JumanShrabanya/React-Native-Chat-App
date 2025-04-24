const User = require("../models/user.model");
const Conversation = require("../models/conversation.model");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");

    const usersWithLastMessages = await Promise.all(
      users.map(async (user) => {
        const conversations = await Conversation.find({
          participants: user._id,
        })
          .populate({
            path: "lastMessage",
            select: "text timestamp sender",
            populate: { path: "sender", select: "name email" },
          })
          .populate({
            path: "participants",
            select: "name email",
          })
          .sort({ updatedAt: -1 });

        return {
          ...user.toObject(),
          conversations,
        };
      })
    );

    res.status(200).json({ users: usersWithLastMessages });
  } catch (error) {
    console.error("Error fetching users with conversations:", error);
    res.status(500).json({
      message: "Failed to fetch users with conversations",
      error: error.message,
    });
  }
};
