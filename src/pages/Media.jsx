import { useState } from "react";
import Search from "../components/general/search";
import Pagination from "../components/general/pagination";
import UseFetch from "../hooks/useFetch";
import PatchDate from "../hooks/PatchData";
import { FaPlus } from "react-icons/fa";
import Confirmation from "../components/general/confrim";
import Toast from "../components/general/toast";
import AddPhoto from "../components/photos/AddPhoto";
import ClockLoader from "../components/general/ClockLoader";
import PhotoCard from "../components/photos/PhotoCard";

const Media = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [severity, setSevrity] = useState("success");
  const [showAdd, setShowAdd] = useState(false);
  const [loading2, setloading2] = useState(false);

  const [data, error, loading, reFetch] = UseFetch(
    `${baseURL}/admins/photos?page=${page}&limit=15`,
    [],
    [page]
  );

  function divideArray(arr, groupCount) {
    let result = Array.from({ length: groupCount }, () => []);

    arr?.forEach((element, index) => {
      const groupIndex = index % groupCount; // Determine which group it belongs to
      result[groupIndex].push(element); // Push the element to the correct group
    });

    return result;
  }

  // const toMap = [
  //   data?.results?.slice(0, 5),
  //   data?.results?.slice(5, 10),
  //   data?.results?.slice(10, 15),
  // ];

  const toMap = divideArray(data?.results, 3);

  const handleSelect = async (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((i) => i !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = async (id) => {
    setloading2(true);
    const [response, resJson] = await PatchDate(
      `${baseURL}/admins/photos`,
      "DELETE",
      { ids: selected }
    );
    if (response.ok) {
      setloading2(false);
      setSelected([]);
      setToastMsg(resJson.message);
      setShowToast(true);
      reFetch();
      return;
    }
    setloading2(false);
    setToastMsg(resJson.message);
    setSevrity("danger");
    setShowToast(true);
  };
  return (
    <>
      <div className="sm:px-6 py-6 px-2">
        {showToast && (
          <Toast
            message={toastMsg}
            severity={severity}
            onClose={() => setShowToast(false)}
          />
        )}
        {loading && <ClockLoader />}
        {loading2 && <ClockLoader />}

        <div className=" font-roboto items-end  ">
          <div className="flex flex-wrap justify-between items-center">
            <h1 className=" text-4xl font-semibold text-[#212529] mb-3">
              Media
            </h1>
            <Search />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-1 items-center justify-between my-2 w-full">
              <p className="text-gray-500">Photos</p>

              <div className="flex gap-1">
                <button
                  onClick={() => setShowConfirm(true)}
                  disabled={selected.length < 1}
                  className="cursor-pointer rounded-md bg-red-500  text-white px-4 py-1"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowAdd(true)}
                  className="cursor-pointer rounded-md bg-blue-500  text-white px-4 py-1 flex gap-1 items-center"
                >
                  Add <FaPlus />
                </button>
              </div>
            </div>
            {showAdd && (
              <AddPhoto
                onClose={() => setShowAdd(false)}
                setShowToast={setShowToast}
                setToastMsg={setToastMsg}
                setSevrity={setSevrity}
                reFetch={reFetch}
              />
            )}
            {showConfirm && (
              <Confirmation
                goBack={() => setShowConfirm(false)}
                handleDelete={handleDelete}
              />
            )}
          </div>
          <div className="py-5 min-h-screen grid grid-cols-3 gap-3">
            <PhotoCard
              photos={toMap}
              selected={selected}
              handleSelect={handleSelect}
            />
          </div>
          <Pagination
            totalPages={data?.totalPages}
            handlePageChange={setPage}
            currentPage={page}
          />
        </div>
      </div>
    </>
  );
};

export default Media;
