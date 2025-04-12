import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    name: {type: String, required: true},
    messages: [
        {
            role: {type: String, required: true},
            content: {type: String, required: true},
            timestamps: {type: Number, required: true}
        }
    ],
    clerkId: {type: String, required: true}
}, {timestamps: true});

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;