import { useRef, useState } from "react";
import UseFetch from "../hooks/useFetch";
import AdminCard from "../components/admin/AdminCard";
import Toast from "../components/general/toast";
import PatchData from "../hooks/PatchData";
import ClockLoader from "../components/general/ClockLoader";

const Admin = () => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [loading2, setLoading2] = useState(false);

  const OPRef = useRef(null);
  const NPRef = useRef(null);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const roleRef = useRef(null);

  const baseURL = import.meta.env.VITE_BASE_URL;

  const [data, error, loading, reFetch] = UseFetch(
    `${baseURL}/admins/accounts`,
    [],
    []
  );

  const handleAdd = async () => {
    if (!nameRef.current.value) {
      setShowToast(true);
      setMessage("name is required");
      setSeverity("danger");
      return;
    }
    if (!passRef.current.value) {
      setShowToast(true);
      setMessage("password is required");
      setSeverity("danger");
      return;
    }
    if (!emailRef.current.value) {
      setShowToast(true);
      setMessage("email is required");
      setSeverity("danger");
      return;
    }
    if (!roleRef.current.value) {
      setShowToast(true);
      setMessage("Role is required");
      setSeverity("danger");
      return;
    }
    setLoading2(true);
    const newAdmin = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
      role: roleRef.current.value,
    };

    const [response, resJson] = await PatchData(
      `${baseURL}/admins/accounts`,
      "PuT",
      newAdmin
    );

    if (response.ok) {
      nameRef.current.value = "";
      emailRef.current.value = "";
      passRef.current.value = "";
      setShowToast(true);
      setMessage("admin added");
      setSeverity("success");
      setLoading2(false);
      reFetch();
      return;
    }
    setMessage(resJson.message);
    setSeverity("danger");
    setShowToast(true);
    setLoading2(false);
  };

  const handleChangepass = async () => {
    if (!OPRef.current.value) {
      setShowToast(true);
      setMessage("Old password is required");
      setSeverity("danger");
      return;
    }
    if (!NPRef.current.value) {
      setShowToast(true);
      setMessage("New password is required");
      setSeverity("danger");
      return;
    }
    setLoading2(true);
    const data = {
      oldPassword: OPRef.current.value,
      newPassword: NPRef.current.value,
    };
    const [response, resJson] = await PatchData(
      `${baseURL}/admins/accounts/password`,
      "PATCH",
      data
    );
    if (response.ok) {
      setShowToast(true);
      setMessage(resJson.message);
      setSeverity("success");
      setLoading2(false);
      return;
    }
    setShowToast(true);
    setMessage(resJson.message);
    setSeverity("danger");
    setLoading2(false);
  };

  return (
    <div className="w-full ">
      {showToast && (
        <Toast
          message={message}
          severity={severity}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="flex justify-between items-end sm:px-3 px-2 ">
        {loading || (loading2 && <ClockLoader />)}
        <div className="flex justify-between items-end">
          <h1 className=" text-4xl font-semibold text-[#212529] mb-1">
            Admins
          </h1>
        </div>
      </div>

      <div className="sm:px-3 px-2 py-4  overflow-x-hidden my-4 flex flex-col gap-8">
        <div className="p-4 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-sm">
          <h2 className="font-semibold my-4">Change Password</h2>
          <div className="flex flex-col gap-2">
            <input
              ref={OPRef}
              placeholder="Old Password"
              className="border border-gray-300 rounded-sm px-2 py-2 w-full"
              type="text"
            />
            <input
              ref={NPRef}
              placeholder="New Password"
              className="border border-gray-300 rounded-sm px-2 py-2 w-full"
              type="text"
            />
            <div>
              <button
                onClick={handleChangepass}
                className="px-3 py-2 text-white bg-blue-500 rounded-md"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-sm">
          <h2 className="font-semibold my-4">Admins</h2>
          <div className="flex flex-col gap-2">
            {data?.map((admin, indx) => {
              return (
                <AdminCard
                  key={indx}
                  admin={admin}
                  reFetch={reFetch}
                  setShowToast={setShowToast}
                  setMessage={setMessage}
                  setSeverity={setSeverity}
                  setLoading2={setLoading2}
                />
              );
            })}
          </div>
        </div>

        <div className="p-4 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-sm">
          <h2 className="font-semibold my-4">Add Admin</h2>
          <div className="flex flex-col gap-2">
            <input
              ref={nameRef}
              placeholder="Name"
              className="border border-gray-300 rounded-sm px-2 py-2 w-full"
              type="text"
            />
            <input
              ref={emailRef}
              placeholder="Email"
              className="border border-gray-300 rounded-sm px-2 py-2 w-full"
              type="Email"
            />
            <input
              ref={passRef}
              placeholder="Password"
              className="border border-gray-300 rounded-sm px-2 py-2 w-full"
              type="text"
            />
            <select
              ref={roleRef}
              className=" border border-gray-300"
              name=""
              id=""
            >
              <option value="superAdmin">Super Admin</option>
              <option value="editor">Editor</option>
            </select>
            <div>
              <button
                onClick={() => handleAdd()}
                className="px-3 py-2 text-white bg-blue-500 rounded-md"
              >
                Add Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
