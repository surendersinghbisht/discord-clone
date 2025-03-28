import User from '../models/user.model.js'
import Request from '../models/request.model.js';
import Group from '../models/group.model.js';
import GroupRequest from '../models/grouprequest.model.js';
import groupRequest from '../models/grouprequest.model.js';


export const sendRequest = async (req, res) => {
    try {
        const {userId} = req.params;
        const senderId = req.user._id;

        const user = await User.findById(userId);

        if(user.friends.includes(senderId)) {
            return res.status(400).json({message: "User is already a friend"});
        }

        const existingRequest = await Request.findOne({sender: senderId, reciever: userId});

        if(existingRequest) {
            return res.status(400).json({message: "Request already sent"});
        }

        const request = new Request({
sender: senderId,
reciever: userId,
        });

        await request.save();
        res.status(200).json({message: "Request sent successfully"});
    } catch (error) {
        console.log(error, "error in sendRequest");
        res.status(500).json({message: "Internal server error"});
    }
}

export const acceptRequest = async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const currentLoggedInUserId = req.user._id;

        
        const request = Request.findById(requestId).populate(
            "sender", "name username friends"
        ).populate("reciever", "name username friends");

        if(request.reciever._id !== currentLoggedInUserId){
            return res.status(403).json({ message: "Not authorized to accept this request" });
        }

    request.status = "accepted";
    await request.save();

    User.findByIdAndUpdate(currentLoggedInUserId,{$addToSet: {friends: request.sender._id}}, {new: true});
    User.findByIdAndUpdate(request.sender._id, {$addToSet: {friends : currentLoggedInUserId}}, {new: true});
        
    res.status(200).json({message: "request accepted succesfully"});
    } catch (error) {
        console.log(error, "error in request controller");
        res.status(500).json({message: "internal server error"});
    }
}


export const deleteRequest = async (req, res)=>{

    try {
        const currentLoggedInUserId = req.user._id;
        const requestId = req.params.requestId;

        const request = await Request.findById(requestId).populate(
            "sender", "name username"
        ).populate(
            "reciever", "name username"
        )

        if(currentLoggedInUserId !== reciever._id) {
            return res.status(403).json({ message: "Not authorized to accept this request" });
        }

        request.status = "rejected";
        request.save();
    } catch (error) {
        console.log(error, "error in request controller");
        res.status(500).json({message: "internal server error"});
    }
}

export const getConnectionRequests =async()=> {
try {
    const userId = req.user._id;

    const request = await Request.find({reciever: userId, status: "pending"}).populate(
"sender", "name username"
    ).populate("reciever", "name username");

    req.json(request)
} catch (error) {
    console.log(error, "error in request controller");
    res.status(500).json({message: "internal server error"});   
}
}


export const sendGroupRequest =async(req, res)=> {
    try {
        const {userId, groupId} = req.params.userId;
const currentLoggedInUserId = req.user._id;

const group = await Group.findById(groupId);

if(!Group) {
    return res.status(400).json({message: "group does not exists"});
}

if(Group.members.includes(userId)){
    return  res.status(400).json({message: "user already in this group"});
  }

const request = await new GroupRequest({
sender: currentLoggedInUserId,
reciever: userId,
groupId
});

request.save();

res.json(request);
    } catch (error) {
        console.log(error, "error in group request controller");
        res.status(500).json({message: "internal server error"});
    }
}


export const acceptGroupRequest = async(req, res)=> {
    try {
        const {groupRequestId} = req.params;
        const currentLoggedInUserId = req.user._id;


        const groupRequest = await GroupRequest.findById(groupRequestId).populate(
            "groupId", "name"
        );

groupRequest.status = "accepted";

groupRequest.save();

await Group.findByIdAndUpdate(groupRequest.groupId, {$addToSet:{members: currentLoggedInUserId}}, {new: true});

res.status(200).json({message: "request accepted succesfully"});
    } catch (error) {
        console.log(error, "error in acceptGroupRequest");
        res.status(500).json({message: "internal  server error"});
    }
}


export const rejectGroupRequest = async(req, res)=> {
try{const requestId  = req.params.requestId;

const request = groupRequest.findById(requestId);

if(!request ){
    return res.status(400).json({message: "request not found"});
}

request.status = "rejected";

request.save();
res.json({message: "user deleted successfully"});
}catch(error) {
    console.log(error, "error in reject group invite controller");
    res.status(500).json({message: "internal server error"});
}

}