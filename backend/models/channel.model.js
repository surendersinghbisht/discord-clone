import mongoose from "mongoose";

const channelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    belongToGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true });

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;
