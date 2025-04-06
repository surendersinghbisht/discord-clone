import Channel from "../models/channel.model.js";
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
    members: [adminId],
    channels: []
});

const defaultChannel = await new Channel({
    name: "#general",
    belongToGroup : group._id,
    members: [adminId]
    })

    await defaultChannel.save();

    await group.channels.push(defaultChannel._id);

await group.save();

await User.findByIdAndUpdate(req.user._id, {$addToSet: {inGroups: group._id}});
await User.findByIdAndUpdate(req.user._id, {$addToSet: {inChannels: defaultChannel._id}});


res.status(201).json({message: "group created sucessfully"});

    } catch (error) {
        console.log(error, "error in group controller");
        res.status(500).json({message: "internal server error"});
    }
}


export const getGroups =async(req, res)=> {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId)
        .select("inGroups")
        .populate("inGroups", "name description") 


res.status(200).json(user.inGroups);

    } catch (error) {
        console.log(error, "error in group controller");
        res.status(500).json({ message: "something went wrong", error });

    }
}


export const getAllChannelsForGroup = async (req, res)=> {

    try {
        const userId = req.user;
    const {groupId}  = req.params;

    const group = await Group.findById(groupId).populate("channels", "name members");
    console.log(group.channels)

    res.status(200).json(group.channels);
    } catch (error) {
        console.log(error, "error in group controller");
        res.status(500).json(error,"something went wrong"); 
    } 
}

export const addChannel = async (req, res)=> {
    try {
        const adminId = req.user;
        const {name, groupId} = req.body;

        if(!name) {
            return res.status(400).json({message: "name is required to create a channel"});
        }
        
const channel = await new Channel({
    name,
    belongToGroup: groupId,
    members: [adminId]
});

await channel.save();

await User.findByIdAndUpdate(adminId, {$addToSet:  {inChannels: channel._id}});


res.status(201).json({message: "group created sucessfully"});

    } catch (error) {
        console.log(error, "error in group controller");
     res.status(500).json(error,"something went wrong"); 
    }
}