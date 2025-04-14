import cloudinary from "../lib/Cloudinary.js";
import User from "../models/user.model.js";

export const getUserProfile =async(req, res)=> {
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

export const editProfile = async(req, res)=> {
    try {
        const userId = req.user._id;
        const {name, username, image} = req.body;
        console.log('img',image)
let updatedImage = ""
        if(image){
            const result = await cloudinary.uploader.upload(image)
            updatedImage = result.secure_url;
        }
        
        
          const editedData = await User.findByIdAndUpdate(
            userId,
            { name, username, image: updatedImage },
            { new: true}
          );
          

          res.status(200).json(editedData);

    } catch (error) {
        console.log(error, "error in editProfile");
        res.status(500).json({message: "internal server error"});
    }
}


