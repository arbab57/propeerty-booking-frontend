import { MdDeleteForever } from "react-icons/md";
import ConfirmationModal from "../general/confrim";
import { useState } from "react";
import PatchData from "../../hooks/PatchData";
import ClockLoader from "../general/ClockLoader";

const UserCard = ({ user, reFetch, setShowToast, setSevrity, setToastMsg }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [showConfirm, setshowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const [response, resJson] = await PatchData(
      `${baseURL}/admins/users/${user._id}`,
      "DELETE"
    );
    if (response.ok) {
      setLoading(false);
      setSevrity("success");
      setToastMsg(resJson.message);
      setShowToast(true);
      reFetch();
      return;
    }
    setSevrity("danger");
    setToastMsg(resJson.message);
    setShowToast(true);
    setLoading(false);
  };

  return (
    <div className="col-span-1 flex flex-col gap-4 bg-white rounded-lg p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      {loading && <ClockLoader />}
      <div className="flex justify-between items-start">
        <div className="text-[#212529] font-semibold flex flex-col gap-1">
          <p className="text-lg">{user?.name}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
          <p className="text-sm text-gray-600">{user?.phone}</p>
          <p className="text-sm text-gray-600">{user?.address}</p>
        </div>
        <div
          onClick={() => setshowConfirm((prev) => !prev)}
          className="flex items-start"
        >
          <MdDeleteForever className="text-3xl cursor-pointer bg-red-500 text-white w-10 h-10 p-1 rounded-md hover:scale-105 transition-transform" />
        </div>
      </div>
      {showConfirm && (
        <ConfirmationModal
          goBack={() => setshowConfirm((prev) => !prev)}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default UserCard;
