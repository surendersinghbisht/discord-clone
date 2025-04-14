import mongoose, { Types } from "mongoose";
const userScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        dafault: ""
    },
    bio:{
        type: String
    },
   location: {
       type: String
   },
   friends: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
   ],
   inGroups: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    }
   ],
   inChannels : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel"
   }]
},{ timestamps: true });

const User = mongoose.model("User", userScehma);
export default User;