import mongoose from "mongoose";

export interface IChunk {
    documentId: mongoose.Types.ObjectId;
    text: string;
    embedding: number[];
    createdAt: Date;
}

const chunkSchema = new mongoose.Schema<IChunk>({
    documentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    embedding: {
        type: [Number],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Chunk = mongoose.models.Chunk || mongoose.model<IChunk>("Chunk", chunkSchema);

export default Chunk;