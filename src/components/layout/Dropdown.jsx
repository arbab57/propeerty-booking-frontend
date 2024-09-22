import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PatchData from "../../hooks/PatchData";
import ClockLoader from "../general/ClockLoader";

const Dropdown = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;

  const handleLogout = async (params) => {
    setLoading(true);
    const [response, resJson] = await PatchData(
      `${baseURL}/admins/accounts/signout`,
      "POST"
    );
    if (response.ok) {
      navigate("/login");
    }
  };
  return (
    <div className="p-4 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-48  gap-3 absolute right-0 rounded-md">
      {loading && <ClockLoader />}
      <button
        onClick={handleLogout}
        className="hover:bg-gray-200 transition w-full text-left p-2 rounded-sm"
      >
        Logout
      </button>
      
    </div>
  );
};

export default Dropdown;
