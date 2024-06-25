import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
export const userSignup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    email.toLowerCase();

    if (!name || !email || !password || !confirmPassword) {
      throw new Error("All fields are required");
    }

    //password check
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }

    // user already exist
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User Already Exist" });
    }
    //hash passsword
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
    console.log("usersignup controller error", error.message);
    return res.status(500).json(error.message);
  }
};
