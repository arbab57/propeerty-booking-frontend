import { useState } from "react";
import Pagination from "../components/general/pagination";
import Search from "../components/general/search";
import UseFetch from "../hooks/useFetch";
import PropertyCard from "../components/properties/PropertyCard";
import ClockLoader from "../components/general/ClockLoader";

const Properties = ({ setProperty, select, onClose }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxprice] = useState("");
  const [sortField, setSortField] = useState("date");
  const [Available, setAvailable] = useState("");

  const [data, error, loading, reFetch] = UseFetch(
    `${baseURL}/admins/properties?query=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortfield=${sortField}&sortorder=${sort}&page=${page}&limit=10&available=${Available}`,
    [],
    [page, search, sort, minPrice, maxPrice, Available, category, sortField]
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const reset = () => {
    setPage(1);
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxprice("");
    setSort("desc");
    setSortField("date");
    setAvailable("");
  };
  return (
    <div className="sm:px-6 py-6 px-2 font-roboto">
      {loading && <ClockLoader />}
      <div className="flex flex-wrap justify-between  items-end  ">
        <div className="flex  justify-between items-end">
          <h1 className=" text-4xl font-semibold text-[#212529] mb-1">
            Properties
          </h1>
        </div>
        <Search search={search} handleSearchChange={handleSearchChange} />
      </div>
      <p className="text-gray-500 md:block hidden">Search</p>
      <div className="flex flex-wrap justify-end items-center my-5 gap-4">
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

      <div className="min-h-screen flex flex-col gap-2">
        {data?.results?.map((property, i) => {
          return (
            <PropertyCard
              select={select}
              setProperty={setProperty}
              key={i}
              property={property}
              reFetch={reFetch}
              onClose={onClose}
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
  );
};

export default Properties;
