import { useState } from "react";
import PatchData from "../hooks/PatchData";
import ClockLoader from "../components/general/ClockLoader";
import Overlapping from "../components/bookings/Overlapping";
import Toast from "../components/general/toast";
import SelectProperty from "../components/bookings/SelectProperty";

const AddBooking = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [bookingStatus, setBookingStatus] = useState("Pending");
  const [paymentStatus, setPaymentStatus] = useState("Unpaid");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [property, setProperty] = useState("");

  const [overLapping, setOverLapping] = useState([]);
  const [showOverLapping, setShowOverLapping] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showAddProperty, setShowAddProperty] = useState(false);

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
    return `${date}`;
  };

  const handleUpdate = async () => {
    setLoading(true);
    let updBooking = {
      name: name,
      email: email,
      phone: phone,
      numberOfGuests: guestCount,
      property: property?._id,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      paymentStatus: paymentStatus,
      bookingStatus: bookingStatus,
    };

    const [response, resJson] = await PatchData(
      `${baseURL}/admins/properties/bookings`,
      "PUT",
      updBooking
    );
    if (response.ok) {
      setLoading(false);
      setToastMsg(resJson.message);
      setSevrity("success");
      setShowToast(true);
      setName("");
      setEmail("");
      setPhone("");
      setGuestCount("");
      setProperty({});
      setCheckIn("");
      setCheckOut("");
      setPaymentStatus("Unpaid");
      setBookingStatus("Pending");
      setOverLapping([]);
      setShowOverLapping(false);
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
    <div className="sm:px-6 py-6 px-2 font-poppins">
      {showToast && (
        <Toast
          message={toastMsg}
          severity={severity}
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="flex justify-between  items-end  ">
        <div className="flex justify-between items-end">
          <h1 className=" text-4xl font-semibold text-[#212529] mb-1">
            Add Booking
          </h1>
        </div>
      </div>
      <p className="text-gray-500">New Booking</p>
      <div className="bg-white rounded-md flex flex-col justify-between py-6">
        {loading && <ClockLoader />}

        <div className="w-full grid grid-cols-2 gap-2">
          <div className="lg:col-span-1 col-span-2">
            <div className="flex flex-col gap-1 mb-1">
              <p className="font-bold">Name</p>
              <input
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 my-1">
              <p className="font-bold">Email</p>
              <input
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
              />
            </div>
            <div className="flex flex-col gap-1 my-1">
              <p className="font-bold">Phone Number</p>
              <input
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="Number"
              />
            </div>
            <div className="flex flex-col gap-1 my-1">
              <p className="font-bold">Property</p>
              <input
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                value={property?.name || ""}
                readOnly
                type="text"
              />
              <button
                onClick={() => setShowAddProperty(true)}
                className="bg-blue-500 px-5 py-2 rounded-sm text-white"
              >
                Select Property
              </button>
              {showAddProperty && (
                <SelectProperty
                  setProperty={setProperty}
                  onClose={() => {
                    setShowAddProperty(false);
                  }}
                />
              )}
            </div>
            <div className="flex flex-col gap-1 my-1">
              <p className="font-bold">Number Of Guests</p>
              <input
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                onChange={(e) => setGuestCount(e.target.value)}
                value={guestCount}
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
                  <option value="Confirmed">Confirmed</option>
                  <option selected={true} value="Pending">
                    Pending
                  </option>
                  <option value="Cancelled">Cancelled</option>
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
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
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
                    value={checkIn ? formatDate(checkIn) : "date"}
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
                    value={checkIn ? formatDate(checkOut) : "date"}
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
            onClick={handleUpdate}
            className="cursor-pointer rounded-md bg-blue-500  text-white px-4 py-1 w-40"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBooking;
