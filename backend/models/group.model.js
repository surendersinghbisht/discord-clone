import mongoose from "mongoose"

const groupSchema = new mongoose.Schema({
    name: {
type: String,
required: true
    },
    description: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "message"
    }],
    channels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel"
    }]
},{timestamps: true})

const group =  mongoose.model("Group", groupSchema);

export default group;