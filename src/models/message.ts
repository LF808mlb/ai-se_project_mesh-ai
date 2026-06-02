import mongoose from "mongoose";

export interface IMessage {
    chatId: mongoose.Types.ObjectId;
    role: string;
    content: string;
    createdAt: Date;
}

const messageSchema = new mongoose.Schema<IMessage>({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    role: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export default Message;