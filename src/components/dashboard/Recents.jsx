import UseFetch from "../../hooks/useFetch";
import Users from "./Users";
import Properties from "./properties";
import Blogs from "./Blogs";
import Bookings from "./Bookings";
import ClockLoader from "../general/ClockLoader";

const Recents = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [data, error, loading, reFetch] = UseFetch(`${baseURL}/admins/recents`);

  return (
    <>
      <p className="text-gray-500">Recent Activity</p>
      <div className="grid grid-cols-2 gap-3">
        {loading && <ClockLoader />}
        <div className="lg:col-span-1 col-span-2 bg-white rounded-md  py-4 flex flex-col gap-3">
          <Bookings reFetch={reFetch} bookings={data?.recentBookings} />
          <Users users={data?.userData} />
        </div>
        <div className="lg:col-span-1 col-span-2 bg-white rounded-md  py-4  flex flex-col gap-3">
          <Properties properties={data?.properties} />
          <Blogs blogs={data?.blogs} />
        </div>
      </div>
    </>
  );
};

export default Recents;
