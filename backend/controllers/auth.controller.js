import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
export const userSignup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    email.toLowerCase();

    if (!name || !email || !password || !confirmPassword) {
      throw new Error("All fields are required");
    }

    // password check
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      confirmPassword,
    });
    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    console.log("userSignup controller error", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    email.toLowerCase();
    const user = await User.findOne({ email });
    //password check
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password || ""
    );
    //check weather user email and password is correct or not
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({ user });
  } catch (error) {
    console.log("userLogin controller error", error.message);
    return res.status(500).json(error.message);
  }
};

export const userLogout = async (req, res) => {
  try {
    //set the cookies 0
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("userLogout controller error", error.message);
    return res.status(500).json(error.message);
  }
};
