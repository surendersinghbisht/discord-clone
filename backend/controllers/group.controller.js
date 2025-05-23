import Channel from "../models/channel.model.js";
import Group from "../models/group.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

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

export const getGroup =async (req, res)=> {
    try {
        const {groupId} = req.params;
        const group = await Group.findById(groupId);

        res.status(200).json(group);
    } catch (error) {
        console.log(error, "error in group controller");
        res.status(500).json({message: "internal server error"});
    }
}


export const getGroups = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const user = await User.findById(userId)
        .select("inGroups")
        .populate("inGroups", "name description");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user.inGroups);
  
    } catch (error) {
      console.error("Error in group controller:", error);
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };
  


export const getAllChannelsForGroup = async (req, res)=> {

    try {
        const userId = req.user;
    const {groupId}  = req.params;

    const group = await Group.findById(groupId).populate("channels", "name members");

    res.status(200).json(group.channels);
    } catch (error) {
        console.log(error, "error in group controller");
        res.status(500).json(error,"something went wrong"); 
    } 
}

export const addChannel = async (req, res)=> {
    try {
        const adminId = req.user;
        const {channelName, groupId} = req.body;
        console.log(channelName, groupId)
        if(!channelName) {
            return res.status(400).json({message: "name is required to create a channel"});
        }
        
const channel = await new Channel({
    name: channelName,
    belongToGroup: groupId,
    members: [adminId]
});

await channel.save();
await Group.findByIdAndUpdate(groupId, {$addToSet: {channels: channel._id}});

await User.findByIdAndUpdate(adminId, {$addToSet:  {inChannels: channel._id}});


res.status(201).json({message: "group created sucessfully"});

    } catch (error) {
        console.log(error, "error in group controller");
     res.status(500).json(error,"something went wrong"); 
    }
}


export const getChannelDetail =async(req, res)=> {
try {
    const userId = req.user;
    const channelId = req.params.channelId;

    const channel = await Channel.findById(channelId).populate("members", "name image");
    res.status(200).json(channel);
} catch (error) {
    console.log(error, "error in group controller");
    res.status(500).json(error,"something went wrong"); 
}
}


export const editChannel = async(req, res)=> {
    try {
       const channelId = req.params.channelId;
       const {channelName} = req.body;
       console.log("channelName",channelName, channelId)
if(channelName === "") {
    res.status(400).json({message: "channelName cannot be empty"});
}
       const channel = await Channel.findByIdAndUpdate(channelId, {name: channelName}, {new: true});
        
       res.status(200).json(channel);

    } catch (error) {
        console.log(error, "error in group controller");
        res.status(500).json(error,"something went wrong"); 
    }
}

export const deleteChannel  = async(req, res)=> {
    try {
        const channelId = req.params.channelId;

     await Channel.findByIdAndDelete(channelId, {new: true});
     res.status(200).json({message: "channel deleted successfully"});
  
    } catch (error) {
        console.log(error, "error in group controller");
        res.status(500).json(error,"something went wrong"); 
    }
}


export const addUserByInvite = async (req, res) => {
    try {
        const { channelId } = req.params;
        const userId = req.user._id;

        const channel = await Channel.findByIdAndUpdate(
            channelId,
            { $addToSet: { members: userId } },
            { new: true }
        );

        if (!channel) {
            return res.status(404).json({ message: "Channel not found" });
        }

        res.status(200).json(channel);
    } catch (error) {
        console.error("Error in addUserByInvite:", error);
        res.status(500).json({ message: "Something went wrong", error });
    }
};


export const getGroupIfAddedToChannel =async(req, res)=> {
    try {
        const userId = req.user._id;
        const {channelId} = req.params;
        const group = await Channel.findById(channelId).populate("belongToGroup","name");
        
        if(!group) {
            return res.status(404).json({ message: "group not found" });
        }
        res.status(200).json(group);
    } catch (error) {
        console.error("Error in addUserByInvite:", error);
        res.status(500).json({ message: "Something went wrong", error });
    }
}

export const addUserTogroupByInvite = async (req, res) => {
    try {
        const userId = req.user._id;
        const { groupId } = req.params;

        
        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            return res.status(400).json({ message: "Invalid group ID format" });
        }

       
      await User.findByIdAndUpdate(userId, {$addToSet: {inGroups: groupId}}, {new: true});
        
      const group = await Group.findById(groupId).populate('channels');
        
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        for(let channelId of group.channels) {
            const channel = await Channel.findById(channelId);

            if(!channel.members.includes(userId)){
                channel.members.push(userId);
                await channel.save();
            }
        }
        
        if (group.members.includes(userId)) {
            return res.status(400).json({ message: "User is already a member of the group" });
        }

       
        if (!group.members.includes(userId)) {
            group.members.push(userId);
            await group.save(); 
        }
    
        res.status(200).json(group);

    } catch (error) {
        console.error("Error in addUserToGroupByInvite:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};


export const editGroup = async (req, res) => {
    try {
       
        const groupId = req.params.groupId; 

       
        const { groupName, groupTopic } = req.body;

  
        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            return res.status(400).json({ message: "Invalid group ID format" });
        }

      
        const group = await Group.findByIdAndUpdate(
            groupId, 
            { name: groupName, description: groupTopic },
            { new: true }  
        );

       
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

       
        res.status(200).json(group);
    } catch (error) {
        console.error("Error in editGroup:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
