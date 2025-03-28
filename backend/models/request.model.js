import mongoose from "mongoose";

export const requestSchema = new mongoose.Schema({
sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},
reciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},
status: {
    enum: ["pending", "accepted", "rejected"],
    type: String,
    default: "pending",
},
}, {timestamps: true});

const request = new mongoose.model("Request", requestSchema);
export default request;