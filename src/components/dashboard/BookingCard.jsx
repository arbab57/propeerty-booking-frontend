import { useState } from "react";
import UpdateBooking from "../bookings/UpdateBooking";
import Toast from "../general/toast";

const BookingCard = ({ booking, reFetch }) => {
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
          <h3 className="text-xl font-semibold text-gray-900 truncate mb-2">
            {booking?.propertyName}
          </h3>
          <p>
            <span className="font-semibold text-md text-gray-700">
              Booking Id:
            </span>{" "}
            <span className="ml-2 text-gray-600 truncate">{booking._id}</span>
          </p>

          <p>
            <span className="font-semibold text-gray-700">Check-in:</span>{" "}
            <span className="ml-2 text-gray-600 truncate">
              {formatDate(booking.checkInDate)}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Check-out:</span>{" "}
            <span className="ml-2 text-gray-600 truncate">
              {formatDate(booking.checkOutDate)}
            </span>
          </p>
        </div>
        <div className="flex flex-col justify-end">
          <p>
            <span className="font-semibold">Status:</span>{" "}
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
            <span className="font-semibold">Guests:</span>{" "}
            {booking.numberOfGuests}
          </p>
          <p>
            <span className="font-semibold">Payment:</span>{" "}
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

      <div className=" flex justify-end">
        <button
          onClick={() => setShowUpdate(true)}
          className="bg-blue-600 text-white font-medium px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          View Details
        </button>
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
