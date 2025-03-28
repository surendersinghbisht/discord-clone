import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const signup = async(req, res)=> {
try {
    const {email, username, password, name} = req.body;
    if( !email || !name || !username || !password){
        return res.status(400).json({message: "All fields are required"})
    }

    const existingEmail = await User.findOne({email});

    if(existingEmail) {
        return res.status(400).json({message: "User already exists"})
    }

   if(password.length < 6) {
    return res.status(400).json({message: "Password must be at least 6 characters"})
   }

   const salt =  await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(password, salt);    
   const user = new User({
    name,
    email,
    username,
    password: hashPassword,
   })

   await user.save();

   const token =  jwt.sign({id: user._id}, process.env.JWT_SECRET);
   res.cookie("chat-token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 3 * 24 * 60 * 60 * 1000,
   });

   res.status(201).json({message: "User created successfully"}); 
} catch (error) {
    console.log(error, 'error in signup');
    res.status(500).json({message: "Something went wrong"})
}
}

export const login = async (req, res)=> {
try {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({message: "All fields are required"})
    }

    const user = await User.findOne({email});

    if(!user) {
       return res.status(400).json({message: "User does not exist"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        return res.status(400).json({message: "Invalid password"});
    }

    const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.cookie("chat-token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({message: "User logged in successfully"});
} catch (error) {
    console.log(error, 'error in login');
    res.status(500).json({message: "Something went wrong"})
}
}


export const logout = async(req, res)=> {
    res.clearCookie("chat-token");
	res.status(200).json({ message: "User logged out successfully" });
}


export const getCurrentUser = async(req, res)=> {
    try {
        const user = req.user;
        if(!user) {
            return res.status(400).json({message : "no user found"})
        }
        res.json(user);
    } catch (error) {
        console.log(error, "error in user controller");
        res.status(500).json({message: "internal server error"});
    }
};