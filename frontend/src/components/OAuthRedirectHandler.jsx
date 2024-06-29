import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("/api/auth/google/callback");
        if (res.status === 200) {
          toast.success("User Login successfully");
          navigate("/financeDashboard");
        }
      } catch (error) {
        toast.error("Login failed");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default OAuthRedirectHandler;
