import { useState } from "react";



const FilterBlog = ({ setEndDate, setSort, setStartDate, reset }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-wrap gap-2 justify-end my-6">
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

      <div className="flex justify-end mb-4 md:hidden">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className=" text-xl text-white bg-blue-600 rounded-sm px-5 py-2"
        >
          Filter
        </button>
      </div>

      {showFilters && (
        <div className="flex md:hidden flex-wrap gap-2 justify-end my-6">
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
      )}
    </>
  );
};

export default FilterBlog;
