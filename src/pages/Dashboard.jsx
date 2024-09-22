import Overview from "../components/dashboard/overview";
import Recents from "../components/dashboard/Recents";

const Dashboard = () => {
  return (
    <>
      <div className="sm:px-6 py-6 px-2">
        <div className="flex justify-between font-roboto items-end  ">
          <div>
            <h1 className=" text-4xl font-semibold text-[#212529] mb-3">
              Dashboard
            </h1>
            <p className="text-gray-500">Dashboard</p>
          </div>
        </div>
        <Overview />
        <Recents />
      </div>
    </>
  );
};

export default Dashboard;
