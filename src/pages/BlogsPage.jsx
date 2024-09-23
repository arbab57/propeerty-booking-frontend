import { useState } from "react";
import ClockLoader from "../components/general/ClockLoader";
import Pagination from "../components/general/pagination";
import Search from "../components/general/search";
import UseFetch from "../hooks/useFetch";
import BlogCard from "../components/blogs/BlogCard";
import FilterBlog from "../components/blogs/FilterBlog";

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

        <FilterBlog reset={reset} setEndDate={setEndDate} setSort={setSort} setStartDate={setStartDate}/>

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
