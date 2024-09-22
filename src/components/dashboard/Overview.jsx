import UseFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { FaChevronRight, FaPlus } from "react-icons/fa";
import ClockLoader from "../general/ClockLoader";

const Overview = () => {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [data, error, loading] = UseFetch(`${baseURL}/admins/recents/overview`);

  return (
    <div className="grid grid-cols-4 gap-3 py-4 font-poppins">
      {loading && <ClockLoader />}
      <div
        className={`bg-blue-600 p-5 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] xl:col-span-1 md:col-span-2 col-span-4`}
      >
        <p className="text-white text-2xl mb-3">Bookings</p>
        <div className="border-t border-black rounded-md"></div>
        <div className="py-4">
          <p className="text-white font-xl">
            Active Bookings: <span>{data?.bookingCount}</span>
          </p>
        </div>
        <div className="flex justify-between gap-2">
          <button
            onClick={() => navigate("/bookings")}
            className="text-white underline my-2"
          >
            Manage Bookings
          </button>
          <button
            onClick={() => navigate("/addbookings")}
            className="text-white my-2 flex items-center hover:scale-105 transition"
          >
            New Bookings <FaChevronRight />
          </button>
        </div>
      </div>

      <div
        className={`bg-green-600 p-5 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] xl:col-span-1 md:col-span-2 col-span-4`}
      >
        <p className="text-white text-2xl mb-3">Properties</p>
        <div className="border-t border-black rounded-md"></div>
        <div className="py-4">
          <p className="text-white font-xl">
            Current Properties: <span>{data?.propertyCount}</span>
          </p>
        </div>
        <div className="flex justify-between gap-2">
          <button
            onClick={() => navigate("/properties")}
            className="text-white underline my-2"
          >
            Manage Properties
          </button>
          <button
            onClick={() => navigate("/addproperties")}
            className="text-white my-2 flex items-center hover:scale-105 transition"
          >
            Add <FaPlus />
          </button>
        </div>
      </div>

      <div
        className={`bg-yellow-600 p-5 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] xl:col-span-1 md:col-span-2 col-span-4`}
      >
        <p className="text-white text-2xl mb-3">Blogs</p>
        <div className="border-t border-black rounded-md"></div>
        <div className="py-4">
          <p className="text-white font-xl">
            Current Blogs: <span>{data?.blogCount}</span>
          </p>
        </div>
        <div className="flex justify-between gap-2">
          <button
            onClick={() => navigate("/blogs")}
            className="text-white underline my-2"
          >
            Manage Blogs
          </button>
          <button
            onClick={() => navigate("/addblogs")}
            className="text-white my-2 flex items-center hover:scale-105 transition"
          >
            Add <FaPlus />
          </button>
        </div>
      </div>

      <div
        className={`bg-teal-600 p-5 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] xl:col-span-1 md:col-span-2 col-span-4`}
      >
        <p className="text-white text-2xl mb-3">Users</p>
        <div className="border-t border-black rounded-md"></div>
        <div className="py-4">
          <p className="text-white font-xl">
            Registered Users: <span>{data?.userCount}</span>
          </p>
        </div>
        <button
          onClick={() => navigate("/users")}
          className="text-white underline my-2"
        >
          Manage Users
        </button>
      </div>
    </div>
  );
};

export default Overview;
