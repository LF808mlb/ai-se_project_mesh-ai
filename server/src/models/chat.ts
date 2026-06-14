import mongoose from "mongoose";

export interface IChat {
    title: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
}

const chatSchema = new mongoose.Schema<IChat>({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Chat = mongoose.models.Chat || mongoose.model<IChat>("Chat", chatSchema);

export default Chat;
