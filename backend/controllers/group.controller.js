import Group from "../models/group.model.js";
import User from "../models/user.model.js";


export const createGroup = async(req, res)=> {
    try {
        const adminId = req.user._id;
const {name, description} = req.body;

if(!name || !description) {
    return res.status(400).json({message: "name and description are required to create a group"});
}

const group = await new Group({
    name,
    admin: adminId,
    description,
    members: [adminId]
});


await group.save();
await User.findByIdAndUpdate(req.user._id, {$addToSet: {inGroups: group._id}});


res.status(201).json({message: "group created sucessfully"});

    } catch (error) {
        console.log(error, "error in group controller");
        res.status(500).json({message: "internal server error"});
    }
}


export const getGroups =async(req, res)=> {
    try {
        const userId = req.user._id;
       const user = await User.findById(userId).select("inGroups").populate("inGroups", "name description");

res.status(200).json(user.inGroups);

    } catch (error) {
        console.log(error, "error in group controller");
     res.status(500).json(error,"something went wrong")   
    }
}