import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property, mode }) => {
  const navigate = useNavigate();
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
    <div
      onClick={() => navigate("/properties")}
      className=" bg-white px-4 py-3 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-2 flex gap-2 sm:flex-row flex-col items-center cursor-pointer hover:scale-105 transition"
    >
      <div className="sm:w-24 w-full sm:h-24 h-56">
        <img
          className="object-cover w-full h-full"
          src={property?.featuredImage?.url}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-xl text-[#374151] font-semibold">{property.name}</p>
        <p className="text-md text-gray-500 font-semibold">
          {property?.category}
        </p>
        <p className="text-md text-gray-500 font-semibold">
          {mode === "added"
            ? formatDate(property?.createdAt)
            : formatDate(property?.updatedAt)}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
