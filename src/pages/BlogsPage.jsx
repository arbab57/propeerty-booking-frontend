import { useState } from "react";
import ClockLoader from "../components/general/ClockLoader";
import Pagination from "../components/general/pagination";
import Search from "../components/general/search";
import UseFetch from "../hooks/useFetch";
import BlogCard from "../components/blogs/BlogCard";

const BlogsPage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [data, error, loading, reFetch] = UseFetch(
    `${baseURL}/admins/blogs?query=${search}&startDate=${startDate}&endDate=${endDate}&sortorder=${sort}&page=${page}&limit=10`,
    [],
    [page, search, sort, startDate, endDate]
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const reset = () => {
    setPage(1);
    setSearch("");
    setSort("asc");
    setStartDate("");
    setEndDate("");
  };
  return (
    <>
      <div className="sm:px-6 py-6 px-2">
        {loading && <ClockLoader />}
        <div className="flex flex-wrap justify-between font-roboto items-end  ">
          <div className="flex justify-between items-end">
            <h1 className=" text-4xl font-semibold text-[#212529] mb-1">
              Blogs
            </h1>
          </div>
          <Search search={search} handleSearchChange={handleSearchChange} />
        </div>
        <p className="text-gray-500">Search</p>

        <div className="flex gap-2 justify-end my-6">
          <div className="flex gap-1 items-center h-9">
            <p className="font-bold">Start Date: </p>
            <input
              onChange={(e) => {
                const sDate = new Date(e.target.value);
                setStartDate(sDate);
                setPage(1);
              }}
              className="border border-gray-400 rounded-sm px-2 py-1"
              type="date"
            />
          </div>
          <div className="flex gap-1 items-center h-9">
            <p className="font-bold">End Date: </p>
            <input
              onChange={(e) => {
                const eDate = new Date(e.target.value);
                setEndDate(eDate);
                setPage(1);
              }}
              className="border border-gray-400 rounded-sm px-2 py-1"
              type="date"
            />
          </div>

          <select
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-400 rounded-sm"
            name=""
            id=""
          >
            <option value="asc">New First</option>
            <option value="desc">Old First</option>
          </select>
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
          {data?.results?.map((blog, i) => {
            return <BlogCard key={i} blog={blog} reFetch={reFetch} />;
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

export default BlogsPage;
