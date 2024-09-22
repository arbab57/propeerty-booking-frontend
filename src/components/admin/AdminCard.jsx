import React, { useState } from "react";
import { MdDeleteForever  } from "react-icons/md";
import ConfirmationModal from "../general/confrim";
import PatchData from "../../hooks/PatchData";

const AdminCard = ({
  admin,
  reFetch,
  setSeverity,
  setMessage,
  setShowToast,
  setLoading2,
}) => {
  const [showConfirm, setshowConfirm] = useState(false);

  const handleDelete = async () => {
    setLoading2(true);
    const baseURL = import.meta.env.VITE_BASE_URL;
    const [response, resJson] = await PatchData(
      `${baseURL}/admins/accounts/${admin.id}`,
      "DELETE"
    );
    if (response.ok) {
      setShowToast(true);
      setSeverity("success");
      setMessage(resJson.message);
      reFetch();
      setLoading2(false);
      return;
    }
    setShowToast(true);
    setSeverity("danger");
    setMessage(resJson.message);
    reFetch();
    setLoading2(false);
  };

  return (
    <div className="bg-white rounded-md p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex justify-between gap-1 items-center">
      <div>
        <p>
          <span className="font-semibold text-slate-800 text-lg">Name: </span>
          {admin?.name}
        </p>
        <p>
          <span className="font-semibold text-slate-800 text-lg">Email: </span>
          {admin?.email}
        </p>
        <p>
          <span className="font-semibold text-slate-800 text-lg">Role: </span>
          {admin?.role}
        </p>
      </div>
      <div>
        <MdDeleteForever
          onClick={() => setshowConfirm(true)}
          className="text-xl cursor-pointer bg-slate-500 text-white w-10 h-10 p-2 rounded-full hover:bg-red-600 transition"
        />
      </div>
      {showConfirm && (
        <ConfirmationModal
          goBack={() => setshowConfirm(false)}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default AdminCard;
