import mongoose from "mongoose";

const oneToOneChatschema  = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    }
}, {timestamps: true});

const oneToOneChat = mongoose.model("oneToOneChat", oneToOneChatschema);

export default oneToOneChat;