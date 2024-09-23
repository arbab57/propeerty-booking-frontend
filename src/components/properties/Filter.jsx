import { useState } from "react";

const Filter = ({
  reset,
  setPage,
  setCategory,
  setAvailable,
  setMinPrice,
  setMaxprice,
  setSort,
  setSortField,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <>
      <div className="md:flex flex-wrap justify-end items-center my-5 gap-4  hidden">
        <div className="flex gap-2 items-center flex-wrap justify-end">
          <div className="flex gap-1 items-center">
            <p className="font-bold">Category: </p>
            <select
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="border border-gray-400 rounded-sm py-1 px-2 h-9"
              name=""
              id=""
            >
              <option selected={true} value={""}>
                None
              </option>
              <option value={"premium"}>Premium</option>
              <option value={"standard"}>Standard</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-1 items-center">
            <p className="font-bold">Availibility: </p>
            <select
              onChange={(e) => {
                setAvailable(e.target.value);
                setPage(1);
              }}
              className="border border-gray-400 rounded-sm py-1 px-2 h-9"
              name=""
              id=""
            >
              <option value={true}>Available</option>
              <option value={false}>Unavailable</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap justify-end items-center gap-4">
          <div className="flex gap-1 items-center">
            <p className="font-bold text-nowrap">Min Price: </p>
            <input
              onChange={(e) => {
                setMinPrice(e.target.value);
                setPage(1);
              }}
              className="py-1 px-2 border border-gray-400 w-24 h-9"
              type="number"
            />
          </div>
          <div className="flex gap-1 items-center">
            <p className="font-bold text-nowrap">Max Price: </p>
            <input
              onChange={(e) => {
                setMaxprice(e.target.value);
                setPage(1);
              }}
              className="py-1 px-2 border border-gray-400 w-24 h-9"
              type="number"
            />
          </div>
        </div>
        <div className=" flex gap-1 flex-wrap justify-end items-center">
          <p className="font-bold text-nowrap">Sort By: </p>
          <select
            onChange={(e) => {
              setSortField(e.target.value);
              setPage(1);
            }}
            className="border border-gray-400 rounded-sm py-1 px-2 h-9"
            name=""
            id=""
          >
            <option selected={true} value="date">
              Date Created
            </option>
            <option value="price">Price</option>
          </select>
          <select
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="border border-gray-400 rounded-sm py-1 px-2 h-9"
            name=""
            id=""
          >
            <option selected={true} value="desc">
              Descending
            </option>
            <option value="asc">Ascending</option>
          </select>
        </div>
        <div className="flex gap-1 items-center h-9">
          <button
            onClick={reset}
            className="px-5 py-2 bg-blue-500 rounded-sm text-white"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex justify-end my-5 md:hidden">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className=" text-xl text-white bg-blue-600 rounded-sm px-5 py-2"
        >
          Filter
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap justify-end items-center my-5 gap-4 md:hidden">
          <div className="flex gap-2 items-center flex-wrap justify-end">
            <div className="flex gap-1 items-center">
              <p className="font-bold">Category: </p>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="border border-gray-400 rounded-sm py-1 px-2 h-9"
                name=""
                id=""
              >
                <option selected={true} value={""}>
                  None
                </option>
                <option value={"premium"}>Premium</option>
                <option value={"standard"}>Standard</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-1 items-center">
              <p className="font-bold">Availibility: </p>
              <select
                onChange={(e) => {
                  setAvailable(e.target.value);
                  setPage(1);
                }}
                className="border border-gray-400 rounded-sm py-1 px-2 h-9"
                name=""
                id=""
              >
                <option value={true}>Available</option>
                <option value={false}>Unavailable</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap justify-end items-center gap-4">
            <div className="flex gap-1 items-center">
              <p className="font-bold text-nowrap">Min Price: </p>
              <input
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setPage(1);
                }}
                className="py-1 px-2 border border-gray-400 w-24 h-9"
                type="number"
              />
            </div>
            <div className="flex gap-1 items-center">
              <p className="font-bold text-nowrap">Max Price: </p>
              <input
                onChange={(e) => {
                  setMaxprice(e.target.value);
                  setPage(1);
                }}
                className="py-1 px-2 border border-gray-400 w-24 h-9"
                type="number"
              />
            </div>
          </div>
          <div className=" flex gap-1 flex-wrap justify-end items-center">
            <p className="font-bold text-nowrap">Sort By: </p>
            <select
              onChange={(e) => {
                setSortField(e.target.value);
                setPage(1);
              }}
              className="border border-gray-400 rounded-sm py-1 px-2 h-9"
              name=""
              id=""
            >
              <option selected={true} value="date">
                Date Created
              </option>
              <option value="price">Price</option>
            </select>
            <select
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="border border-gray-400 rounded-sm py-1 px-2 h-9"
              name=""
              id=""
            >
              <option selected={true} value="desc">
                Descending
              </option>
              <option value="asc">Ascending</option>
            </select>
          </div>
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

export default Filter;
