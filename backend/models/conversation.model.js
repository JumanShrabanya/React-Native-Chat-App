const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Chat" },
    type: { type: String, enum: ["direct", "group"], default: "direct" },
    name: { type: String }, // For group chats
    groupAdmins: [{ type: Schema.Types.ObjectId, ref: "User" }], // For group chats
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
