import { useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import ConfirmationModal from "../general/confrim";
import PatchData from "../../hooks/PatchData";
import UpdateBooking from "./UpdateBooking";
import Toast from "../general/toast";

const BookingCard = ({ booking, reFetch }) => {
  const [showConfirm, setshowConfirm] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [showUpdate, setShowUpdate] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [severity, setSevrity] = useState("success");

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString).toLocaleDateString("en-US", options);
    const time = new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${date}, ${time}`;
  };
  const handleDelete = async () => {
    const [response, resJson] = await PatchData(
      `${baseURL}/admins/properties/bookings/${booking._id}`,
      "DELETE"
    );
    if (!response.ok) {
      setSevrity("danger");
      setToastMsg(resJson.message);
      setShowToast(true);
      return;
    }
    setSevrity("success");
    setToastMsg(resJson.message);
    setShowToast(true);
    reFetch();
  };

  return (
    <div className="bg-white px-5 py-4 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-2">
      {showToast && (
        <Toast
          onClose={() => setShowToast(false)}
          message={toastMsg}
          severity={severity}
        />
      )}
      <div className="flex sm:flex-row flex-col justify-between gap-1">
        <div className="">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {booking?.propertyName}
          </h3>

          <p>
            <span className="font-semibold text-md text-gray-800 truncate">Booking Id:</span>{" "}
            <span className="ml-2 text-gray-600 truncate"> {booking._id}</span>

           
          </p>
          <p>
            <span className="font-semibold text-gray-800 truncate">Name:</span> {booking?.name}
          </p>

          <p>
            <span className="font-semibold text-gray-700">Check-in:</span>{" "}
            <span className="ml-2 text-gray-600 truncate">{formatDate(booking?.checkInDate)}</span>

            
          </p>
          <p>
            <span className="font-semibold text-gray-700">Check-out:</span>{" "}
            <span className="ml-2 text-gray-600 truncate">{formatDate(booking?.checkOutDate)}</span>

            
          </p>
          <p>
            <span className="font-semibold text-gray-700">Created At:</span>{" "}
            <span className="ml-2 text-gray-600 truncate">{formatDate(booking?.createdAt)}</span>

          </p>
        </div>
        <div className="flex flex-col justify-end">
          <p>
            <span className="font-semibold text-gray-700">Status:</span>{" "}
            <span
              className={`${
                booking.bookingStatus === "Confirmed"
                  ? "text-green-500"
                  : "text-yellow-500"
              } font-bold`}
            >
              {booking.bookingStatus}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Guests:</span>{" "}
            {booking.numberOfGuests}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Payment:</span>{" "}
            <span
              className={`${
                booking.paymentStatus === "Paid"
                  ? "text-green-500"
                  : "text-red-500"
              } font-bold`}
            >
              {booking.paymentStatus}
            </span>
          </p>
        </div>
      </div>
      <div className="border-t border-gray-300 my-3"></div>

      <div className="flex items-center justify-end gap-2 mt-4">
        <MdEdit
          onClick={() => setShowUpdate(true)}
          className="text-2xl cursor-pointer bg-blue-500 text-white w-10 h-10 p-2 rounded-full hover:bg-blue-600 transition"
        />
        <MdDeleteForever
          onClick={() => setshowConfirm(true)}
          className="text-2xl cursor-pointer bg-red-500 text-white w-10 h-10 p-2 rounded-full hover:bg-red-600 transition"
        />

        {showConfirm && (
          <ConfirmationModal
            goBack={() => setshowConfirm((prev) => !prev)}
            handleDelete={handleDelete}
          />
        )}

        {showUpdate && (
          <UpdateBooking
            booking={booking}
            setToastMsg={setToastMsg}
            setSevrity={setSevrity}
            setShowToast={setShowToast}
            reFetch={reFetch}
            onClose={() => setShowUpdate(false)}
          />
        )}
      </div>
    </div>
  );
};

export default BookingCard;
