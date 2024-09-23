import { useState } from "react";
import ClockLoader from "../components/general/ClockLoader";
import Pagination from "../components/general/pagination";
import Search from "../components/general/search";
import UseFetch from "../hooks/useFetch";
import BookingCard from "../components/bookings/BookingCard";
import Filters from "../components/bookings/Filters";

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

        <Filters
          reset={reset}
          setBookingStatus={setBookingStatus}
          setCheckIn={setCheckIn}
          setCheckOut={setCheckOut}
          setPaymentStatus={setPaymentStatus}
          setSort={setSort}
        />

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
