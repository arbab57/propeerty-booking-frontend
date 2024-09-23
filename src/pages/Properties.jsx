import { useState } from "react";
import Pagination from "../components/general/pagination";
import Search from "../components/general/search";
import UseFetch from "../hooks/useFetch";
import PropertyCard from "../components/properties/PropertyCard";
import ClockLoader from "../components/general/ClockLoader";
import Filter from "../components/properties/Filter";

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
      <Filter
        reset={reset}
        setAvailable={setAvailable}
        setCategory={setCategory}
        setMinPrice={setMinPrice}
        setMaxprice={setMaxprice}
        setPage={setPage}
        setSort={setSort}
        setSortField={setSortField}

      />

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
