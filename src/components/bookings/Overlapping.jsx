const Overlapping = ({ overlapping }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString).toLocaleDateString("en-US", options);
    const time = new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${date}`;
  };
  return (
    <div className="flex flex-col gap-2 py-6">
      <h2 className="text-xl font-semibold">OverLapping Bookings</h2>
      {overlapping?.map((booking, i) => {
        return (
          <div key={i} className="shadow-md rounded-sm p-3">
            <h3 className="text-md font-semibold text-gray-800 mb-2 ">
              {booking?.propertyName}
            </h3>
            <p>
              <span className="font-semibold text-md">Booking Id:</span>{" "}
              {booking._id}
            </p>
            <p>
              <span className="font-semibold text-md">Name:</span>{" "}
              {booking?.name}
            </p>
            <p>
              <span className="font-semibold text-md">Check-in:</span>{" "}
              {formatDate(booking?.checkInDate)}
            </p>
            <p>
              <span className="font-semibold text-md">Check-in:</span>{" "}
              {formatDate(booking?.checkOutDate)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Overlapping;
