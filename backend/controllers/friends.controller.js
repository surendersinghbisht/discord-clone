import User from "../models/user.model.js";

export const getFriends = async(req, res)=> {
try {
    const userId = req.user._id;
    if(!userId) {
        return res.status(400).json({message: "user not found"});
    }

    const user = await User.findById(userId)
    .populate({
      path: 'friends',
      select: '-password', 
    })
    .exec();

    res.json(user.friends);

} catch (error) {
    console.log(error, "error in friends controller");
    res.status(500).json({message: "internal server error"});
}
}



export const FindFriends = async(req, res)=> {
    try {
        const {username} = req.params;

        const friend = await User.findOne({username});
console.log('friend find', friend)
        res.status(200).json(friend);
    } catch (error) {
        console.log(error, "error in friend controller");
        res.status(500).json({message: "internal server error"})
    }
}