import User from "../models/user.model.js";
import FriendRequest from "../models/friendRequest.model.js"

export const sendFriendRequest =async(req, res)=> {
    try {
        const {recieverId} = req.params;
        const senderId = req.user._id;

        // const user = await User.findById(senderId);

        // if(!user.friends.includes(recieverId)) {
        //     res.status(400).json({message: "already a connection"});
        // }

        const existingRequest = await FriendRequest.findOne({
			sender: senderId,
			reciever: recieverId,
			status: "pending",
		});

		if (existingRequest) {
			return res.status(400).json({ message: "A connection request already exists" });
		}

const request =  new FriendRequest({
    reciever: recieverId,
sender: senderId,
});


await request.save();

res.status(201).json({ message: "Connection request sent successfully" });

    } catch (error) {
        console.error("Error in Rewuest:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message }); 
    }
}


export const acceptRequest =async(req,res)=> {
    try {
        const {requestId} = req.params;
        const userId = req.user._id;

        const request = await FriendRequest.findByIdAndUpdate(requestId, {
            status: "accepted"
        }, {new: true});

        if (!request) {
            return res.status(404).json({ message: "Friend request not found" });
        }

        await User.findByIdAndUpdate(userId, {$addToSet: {friends: request.sender}});

        await User.findByIdAndUpdate(request.sender, {$addToSet: {friends: userId}});

        res.status(200).json({ message: "Friend request accepted", request });
    } catch (error) {
        console.error("Error accepting friend request:", error);
        res.status(500).json({ message: "Internal server error" });   
    }
}

export const getRequests =async(req, res)=> {
    try {
        const userId = req.user._id;

        const requests = await FriendRequest.find({reciever: userId, status: "pending"}).populate(
			"sender",
			"name username image bio friends"
		);

        res.json(requests);
    } catch (error) {
        console.error("Error in getConnectionRequests controller:", error);
		res.status(500).json({ message: "Server error" });   
    }
}


export const deleteRequest = async(req, res)=> {
    try {
        const {requestId} = req.params;
		const userId = req.user._id;

		const request = await ConnectionRequest.findById(requestId);

		if (request.reciever.toString() !== userId.toString()) {
			return res.status(403).json({ message: "Not authorized to reject this request" });
		}

		if (request.status !== "pending") {
			return res.status(400).json({ message: "This request has already been processed" });
		}

		request.status = "rejected";
		await request.save();

		res.json({ message: "Connection request rejected" });
    } catch (error) {
        console.error("Error in getConnectionRequests controller:", error);
		res.status(500).json({ message: "Server error" });   
    }
}