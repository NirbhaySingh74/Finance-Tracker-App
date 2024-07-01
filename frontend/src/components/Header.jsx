import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Header = ({ userData }) => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {});
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to logout!");
    }
  };

  return (
    <header className="bg-blue-700 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <div className="text-3xl font-bold">Finance Dashboard</div>
      {userData && (
        <div className="relative flex items-center">
          <img
            src={userData?.profilePic}
            alt="User Profile"
            className="w-10 h-10 rounded-full mr-4 cursor-pointer"
            onClick={() => setShowLogout(!showLogout)}
          />
          <span className="font-medium">{userData.name}</span>
          {showLogout && (
            <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg py-2 z-10">
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
