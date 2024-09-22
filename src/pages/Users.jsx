import { useState } from "react";
import ClockLoader from "../components/general/ClockLoader";
import Pagination from "../components/general/pagination";
import Search from "../components/general/search";
import UseFetch from "../hooks/useFetch";
import UserCard from "../components/users/UserCard";
import Toast from "../components/general/toast";

const Users = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [severity, setSevrity] = useState("success");
  const [data, error, loading, reFetch] = UseFetch(
    `${baseURL}/admins/users?query=${search}&page=${page}&limit=15`,
    [],
    [page, search]
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <>
      <div className="sm:px-6 py-6 px-2">
        {showToast && (
          <Toast
            onClose={() => setShowToast(false)}
            message={toastMsg}
            severity={severity}
          />
        )}
        {loading && <ClockLoader />}
        <div className="flex flex-wrap justify-between font-roboto items-end  ">
          <div className="flex justify-between items-end">
            <h1 className=" text-4xl font-semibold text-[#212529] mb-1">
              Users
            </h1>
          </div>
          <Search search={search} handleSearchChange={handleSearchChange} />
        </div>
        <p className="text-gray-500">Search</p>

        <div className=" grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-2 py-6">
          {data?.results?.map((user, i) => {
            return (
              <UserCard
                key={i}
                user={user}
                reFetch={reFetch}
                setShowToast={setShowToast}
                setSevrity={setSevrity}
                setToastMsg={setToastMsg}
              />
            );
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

export default Users;
