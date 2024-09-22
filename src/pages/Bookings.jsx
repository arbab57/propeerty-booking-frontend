import { useState } from "react";
import ClockLoader from "../components/general/ClockLoader";
import Pagination from "../components/general/pagination";
import Search from "../components/general/search";
import UseFetch from "../hooks/useFetch";
import BookingCard from "../components/bookings/BookingCard";

const Bookings = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");

  const [data, error, loading, reFetch] = UseFetch(
    `${baseURL}/admins/properties/bookings/search?query=${search}&checkInDate=${checkIn}&checkOutDate=${checkOut}&paymentStatus=${paymentStatus}&bookingStatus=${bookingStatus}&sortorder=${sort}&page=${page}&limit=10`,
    [],
    [page, search, sort, checkIn, checkOut, paymentStatus, bookingStatus]
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const reset = () => {
    setPage(1);
    setSearch("");
    setSort("asc");
    setCheckIn("");
    setCheckOut("");
    setBookingStatus("");
    setPaymentStatus("");
  };

  return (
    <>
      <div className="sm:px-6 py-6 px-2">
        <div className="flex flex-wrap justify-between font-roboto items-end  ">
          {loading && <ClockLoader />}
          <div className="flex justify-between items-end">
            <h1 className=" text-4xl font-semibold text-[#212529] mb-1">
              Bookings
            </h1>
          </div>
          <Search search={search} handleSearchChange={handleSearchChange} />
        </div>
        <p className="text-gray-500">Search</p>

        <div className="flex gap-4 flex-wrap justify-end my-6">
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

        <div className="min-h-screen flex flex-col gap-2">
          {data?.results?.map((booking, i) => {
            return <BookingCard key={i} booking={booking} reFetch={reFetch} />;
          })}
        </div>

        <Pagination
          handlePageChange={setPage}
          currentPage={page}
          totalPages={data?.totalPages}
        />
      </div>
    </>
  );
};

export default Bookings;
