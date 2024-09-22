import { useRef, useState } from "react";
import patchData from "../hooks/PatchData";
import Toast from "../components/general/toast";
import { useNavigate } from "react-router-dom";
import ClockLoader from "../components/general/ClockLoader";

function login() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [severity, setSevrity] = useState("success");
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async () => {
    setLoading(true);
    if (!emailRef.current.value) {
      setToastMsg("Email is Required");
      setSevrity("danger");
      setShowToast(true);
      setLoading(false);
      return;
    }
    if (!passwordRef.current.value) {
      setToastMsg("Password is Required");
      setSevrity("danger");
      setShowToast(true);
      setLoading(false);
      return;
    }
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const [response, resJson] = await patchData(
      `${baseURL}/admins/accounts/login`,
      "POST",
      data
    );
    if (!response.ok) {
      setLoading(false);
      setToastMsg(resJson.message || "An Error Occured");
      setSevrity("danger");
      setShowToast(true);
      return;
    }
    localStorage.setItem("role", JSON.stringify(resJson));
    if (resJson.role === "superAdmin") {
      navigate("/");
    } else {
      navigate("/properties");
    }
  };

  return (
    <div className="flex flex-col gap-10 justify-center items-center h-screen ">
      {showToast && (
        <Toast
          message={toastMsg}
          onClose={() => setShowToast(false)}
          severity={severity}
        />
      )}
      {loading && <ClockLoader />}
      <div className="text-center">
        <p className="text-gray-400 text-lg mt-4">
          Log in with your credentials to get started
        </p>
      </div>

      <div className="bg-white input-entry p-7 outline-none flex flex-col w-[350px] rounded-sm">
        <h2 className="font-medium text-lg text-center mb-6">Log In</h2>
        <input
          ref={emailRef}
          placeholder="Enter Email"
          className="w-full border border-gray-300 px-2 py-2 mb-2"
          type="email"
        />
        <input
          ref={passwordRef}
          placeholder="Enter Password"
          className="w-full border border-gray-300 px-2 py-2 mb-5"
          type="password"
        />

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleSubmit}
            className="w-full text-white bg-blue-500 py-2 text-center hover:bg-blue-600 transition"
          >
            LOG IN
          </button>

          <div className="flex items-center justify-center gap-4 w-full">
            <div className=" w-full border-t border-gray-300"></div>

            <div className=" w-full border-t border-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default login;
