import BookingCard from "./BookingCard";

const Bookings = ({ bookings, reFetch }) => {
  return (
    <div>
      <p className="text-[#212529] font-bold mb-4 text-xl">New Bookings</p>

      {bookings?.map((booking, i) => {
        return <BookingCard reFetch={reFetch} key={i} booking={booking} />;
      })}
    </div>
  );
};

export default Bookings;
