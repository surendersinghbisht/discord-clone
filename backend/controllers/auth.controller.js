import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === "production";

export const signup = async (req, res) => {
  try {
    const { email, username, password, name } = req.body;
    if (!email || !name || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({
        message: "Username already exists. Please choose something unique.",
      });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("chat-token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error, "Error in signup");
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("chat-token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error(error, "Error in login");
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("chat-token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  });
  res.status(200).json({ message: "User logged out successfully" });
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error, "Error in getCurrentUser");
    res.status(500).json({ message: "Internal server error" });
  }
};
