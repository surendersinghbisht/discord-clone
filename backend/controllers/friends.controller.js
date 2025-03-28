import User from "../models/user.model.js";

export const getFriends = async(req, res)=> {
try {
    console.log('ssaasss')
    const userId = req.user._id;
    console.log(userId)
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