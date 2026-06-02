import mongoose from "mongoose";

export interface IDocument {
    title: string;
    fileName: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
}

const documentSchema = new mongoose.Schema<IDocument>({
    title: {
        type: String,
        required: true
    },
    fileName: {
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

const Document = mongoose.models.Document || mongoose.model<IDocument>("Document", documentSchema);

export default Document;
