const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
    attachment: { type: String },
  },
  { timestamps: false }
);

const Chat = mongoose.model("Message", chatSchema);
module.exports = Chat;
