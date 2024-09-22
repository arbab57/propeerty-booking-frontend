import { useState } from "react";
import PatchData from "../../hooks/PatchData";
import ClockLoader from "../general/ClockLoader";
import Overlapping from "./Overlapping";

const UpdateBooking = ({
  booking,
  onClose,
  setShowToast,
  reFetch,
  setToastMsg,
  setSevrity,
}) => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [name, setName] = useState(booking?.name);
  const [email, setEmail] = useState(booking?.email);
  const [phone, setPhone] = useState(booking?.phone);
  const [guestCount, setGuestCount] = useState(booking?.numberOfGuests);
  const [bookingStatus, setBookingStatus] = useState(booking?.bookingStatus);
  const [paymentStatus, setPaymentStatus] = useState(booking?.paymentStatus);
  const [checkIn, setCheckIn] = useState(booking?.checkInDate);
  const [checkOut, setCheckOut] = useState(booking?.checkOutDate);

  const [overLapping, setOverLapping] = useState([]);
  const [showOverLapping, setShowOverLapping] = useState(false);

  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString).toLocaleDateString("en-US", options);
    const time = new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${date}`;
  };

  const handleUpdate = async () => {
    setLoading(true);
    let updBooking = {
      name: name,
      email: email,
      phone: phone,
      numberOfGuests: guestCount,
      paymentStatus: paymentStatus,
      bookingStatus: bookingStatus,
    };
    if (
      checkIn !== booking?.checkInDate ||
      checkOut !== booking?.checkOutDate
    ) {
      updBooking.checkInDate = checkIn;
      updBooking.checkOutDate = checkOut;
    }
    const [response, resJson] = await PatchData(
      `${baseURL}/admins/properties/bookings/${booking._id}`,
      "PATCH",
      updBooking
    );
    if (response.ok) {
      setLoading(false);
      setToastMsg("Booking Updated");
      setSevrity("success");
      setShowToast(true);
      onClose();
      reFetch();
      return;
    }
    if ("overlapping" in resJson) {
      setOverLapping(resJson["overlapping"]);
      setShowOverLapping(true);
    }
    setLoading(false);
    setToastMsg(resJson.message);
    setSevrity("danger");
    setShowToast(true);
  };

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-45 flex justify-center items-center w-screen h-screen z-40">
      {loading && <ClockLoader />}
      <div className="bg-white w-[92%] h-[92%] rounded-md flex flex-col justify-between sm:p-5 p-3 overflow-auto">
        <div className="w-full grid grid-cols-2 gap-2">
          <div className="lg:col-span-1 col-span-2">
            <div className="flex flex-col gap-1 mb-1">
              <p className="font-bold">Booking Id:</p>
              <input
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                value={booking?._id}
                readOnly
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 mb-1">
              <p className="font-bold">Name</p>
              <input
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 my-1">
              <p className="font-bold">Email</p>
              <input
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>
            <div className="flex flex-col gap-1 my-1">
              <p className="font-bold">Phone Number</p>
              <input
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="Number"
              />
            </div>
            <div className="flex flex-col gap-1 my-1">
              <p className="font-bold">Property</p>
              <input
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                value={booking?.propertyName}
                readOnly
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 my-1">
              <p className="font-bold">Number Of Guests</p>
              <input
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                type="number"
              />
            </div>
          </div>

          <div className="lg:col-span-1 col-span-2">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex flex-col gap-1 my-1">
                <p className="font-bold">Booking Status</p>
                <select
                  className="border-gray-300 border"
                  onChange={(e) => setBookingStatus(e.target.value)}
                  name=""
                  id=""
                >
                  <option
                    selected={booking?.bookingStatus === "Confirmed"}
                    value="Confirmed"
                  >
                    Confirmed
                  </option>
                  <option
                    selected={booking?.bookingStatus === "Pending"}
                    value="Pending"
                  >
                    Pending
                  </option>
                  <option
                    selected={booking?.bookingStatus === "Cancelled"}
                    value="Cancelled"
                  >
                    Cancelled
                  </option>
                </select>
              </div>

              <div className="flex flex-col gap-1 my-1">
                <p className="font-bold">Payment Status</p>
                <select
                  className="border-gray-300 border"
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  name=""
                  id=""
                >
                  <option
                    selected={booking?.paymentStatus === "Paid"}
                    value="Paid"
                  >
                    Paid
                  </option>
                  <option
                    selected={booking?.paymentStatus === "Unpaid"}
                    value="Unpaid"
                  >
                    Unpaid
                  </option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1 my-1">
                <p className="font-bold">Check In</p>
                <div className="flex items-end flex-wrap gap-2">
                  <input
                    onChange={(e) => {
                      const s = new Date(e.target.value).getTime();
                      setCheckIn(s);
                    }}
                    className="px-2 py-2 border border-gray-300 rounded-md sm:w-auto w-full"
                    type="date"
                  />
                  <input
                    value={formatDate(checkIn)}
                    readOnly
                    className="px-2 py-2 border border-gray-300 rounded-md sm:w-auto w-full"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 my-1">
                <p className="font-bold">Check Out</p>
                <div className="flex items-end flex-wrap gap-2">
                  <input
                    onChange={(e) => {
                      const s = new Date(e.target.value).getTime();
                      setCheckOut(s);
                    }}
                    className="px-2 py-2 border border-gray-300 rounded-md sm:w-auto w-full"
                    type="date"
                  />
                  <input
                    value={formatDate(checkOut)}
                    readOnly
                    className="px-2 py-2 border border-gray-300 rounded-md sm:w-auto w-full"
                    type="text"
                  />
                </div>
              </div>
            </div>

            {showOverLapping && <Overlapping overlapping={overLapping} />}
          </div>
        </div>

        <div className="flex items-center gap-1 justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-md bg-red-500  text-white px-4 py-1"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="cursor-pointer rounded-md bg-blue-500  text-white px-4 py-1"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBooking;
