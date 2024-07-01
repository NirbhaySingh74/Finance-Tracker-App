import { User } from "../models/user.model.js";
export const getUser = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId); // This should log the user ID
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
