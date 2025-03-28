import User from "../models/user.model.js";

export const getUserProfile =async()=> {
    try {
        const userId = req.params.userId;

        if(!userId) {
            res.status(400).json({message: "user not found"});
        }

        const user = User.findById(userId);
        res.json(user);
    } catch (error) {
        console.log(error, "error in getUserProfile controller");
       res.status(500).json({message: "internal server error"});
    }
}

