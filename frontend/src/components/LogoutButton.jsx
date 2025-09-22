import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5050/api/v1/user/logout", {}, { 
        withCredentials: true, // very important for cookies
      });
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-red-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-600"
    >
      Logout
    </button>
  );
}
