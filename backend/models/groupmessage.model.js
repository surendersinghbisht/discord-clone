import mongoose from "mongoose";
import group from "./group.model";

const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        required: true
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    }
},{timestamps: true});

const message = mongoose.Schema("message", messageSchema);
export default message;