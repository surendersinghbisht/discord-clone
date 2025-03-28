import mongoose from "mongoose";

const groupRequestSchema = mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        enum: ["pending", "accepted", "rejected"],
        type: String,
        default: "pending"
    }
}, {timestamps: true});

const groupRequest = mongoose.model("groupRequest", groupRequestSchema);

export default groupRequest;