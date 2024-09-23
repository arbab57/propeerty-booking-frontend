import { useState } from "react";

const Filters = ({
  setCheckIn,
  setCheckOut,
  setSort,
  setBookingStatus,
  setPaymentStatus,
  reset,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  console.log(showFilters);

  return (
    <>
      <div className="md:flex hidden gap-4 flex-wrap justify-end my-6">
        <div className="flex gap-1 items-center h-9">
          <p className="font-bold">Check In: </p>
          <input
            onChange={(e) => {
              const sDate = new Date(e.target.value);
              setCheckIn(sDate);
              setPage(1);
            }}
            className="border border-gray-400 rounded-sm px-2 py-1"
            type="date"
          />
        </div>
        <div className="flex gap-1 items-center h-9">
          <p className="font-bold">Check Out: </p>
          <input
            onChange={(e) => {
              const eDate = new Date(e.target.value);
              setCheckOut(eDate);
              setPage(1);
            }}
            className="border border-gray-400 rounded-sm px-2 py-1"
            type="date"
          />
        </div>

        <div className="flex gap-1 items-center ">
          <p className="font-bold">Sort: </p>

          <select
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-400 rounded-sm"
            name=""
            id=""
          >
            <option value="asc">New First</option>
            <option value="desc">Old First</option>
          </select>
        </div>
        <div className="flex gap-1 items-center ">
          <p className="font-bold">Payment Status: </p>
          <select
            onChange={(e) => {
              setPaymentStatus(e.target.value);
              setPage(1);
            }}
            className="border border-gray-400 rounded-sm h-9"
            name=""
            id=""
          >
            <option value={""}>None</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>
        <div className="flex gap-1 items-center ">
          <p className="font-bold">Booking Status: </p>
          <select
            onChange={(e) => {
              setBookingStatus(e.target.value);
              setPage(1);
            }}
            className="border border-gray-400 rounded-sm h-9"
            name=""
            id=""
          >
            <option selected={true} value="">
              None
            </option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex gap-1 items-center h-9">
          <button
            onClick={reset}
            className="px-5 py-2 bg-blue-500 rounded-sm text-white"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex justify-end mb-4 md:hidden">
        <button
          onClick={() => {
            setShowFilters((prev) => !prev);
          }}
          className=" text-xl text-white bg-blue-600 rounded-sm px-5 py-2"
        >
          Filter
        </button>
      </div>

      {showFilters && (
        <div className="flex md:hidden gap-4 flex-wrap justify-end my-6">
          <div className="flex gap-1 items-center h-9">
            <p className="font-bold">Check In: </p>
            <input
              onChange={(e) => {
                const sDate = new Date(e.target.value);
                setCheckIn(sDate);
                setPage(1);
              }}
              className="border border-gray-400 rounded-sm px-2 py-1"
              type="date"
            />
          </div>
          <div className="flex gap-1 items-center h-9">
            <p className="font-bold">Check Out: </p>
            <input
              onChange={(e) => {
                const eDate = new Date(e.target.value);
                setCheckOut(eDate);
                setPage(1);
              }}
              className="border border-gray-400 rounded-sm px-2 py-1"
              type="date"
            />
          </div>

          <div className="flex gap-1 items-center ">
            <p className="font-bold">Sort: </p>

            <select
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-400 rounded-sm"
              name=""
              id=""
            >
              <option value="asc">New First</option>
              <option value="desc">Old First</option>
            </select>
          </div>
          <div className="flex gap-1 items-center ">
            <p className="font-bold">Payment Status: </p>
            <select
              onChange={(e) => {
                setPaymentStatus(e.target.value);
                setPage(1);
              }}
              className="border border-gray-400 rounded-sm h-9"
              name=""
              id=""
            >
              <option value={""}>None</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
          <div className="flex gap-1 items-center ">
            <p className="font-bold">Booking Status: </p>
            <select
              onChange={(e) => {
                setBookingStatus(e.target.value);
                setPage(1);
              }}
              className="border border-gray-400 rounded-sm h-9"
              name=""
              id=""
            >
              <option selected={true} value="">
                None
              </option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex gap-1 items-center h-9">
            <button
              onClick={reset}
              className="px-5 py-2 bg-blue-500 rounded-sm text-white"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Filters;
