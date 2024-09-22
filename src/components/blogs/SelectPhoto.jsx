import { useState } from "react";
import Search from "../general/search";
import Pagination from "../general/pagination";
import UseFetch from "../../hooks/useFetch";
import PatchDate from "../../hooks/PatchData";
import { FaPlus } from "react-icons/fa";
import Confirmation from "../general/confrim";
import Toast from "../general/toast";
import AddPhoto from "../photos/AddPhoto";
import ClockLoader from "../general/ClockLoader";
import PhotoCard from "../photos/PhotoCard";

const SelectPhoto = ({ multple, setImgId, onClose }) => {
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

  const toMap = [
    data?.results?.slice(0, 5),
    data?.results?.slice(5, 10),
    data?.results?.slice(10, 15),
  ];

  const handleSelect = async (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((i) => i !== id)
        : [...prevSelected, id]
    );
    return;
  };

  const handleSelect2 = async (id) => {
    if (multple) {
      const images = data?.results.filter((img, i) =>
        selected.includes(img._id)
      );
      setImgId((prev) => {
        return [...images, ...prev];
      });
      onClose();
      return;
    }
    if (selected.length > 1) {
      setSevrity("danger");
      setToastMsg("Cannot Select More than One Image");
      setShowToast(true);
      return;
    }
    const image = data?.results.filter((img, i) => selected.includes(img._id));
    setImgId(image[0]);
    onClose();
  };

  const handleDelete = async (id) => {
    const [response, resJson] = await PatchDate(
      `${baseURL}/admins/photos`,
      "DELETE",
      { ids: selected }
    );
    if (response.ok) {
      setSelected([]);
      setToastMsg(resJson.message);
      setShowToast(true);
      reFetch();
      return;
    }
    setToastMsg(resJson.message);
    setSevrity("danger");
    setShowToast(true);
  };
  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-45 flex justify-center items-center w-screen h-screen z-40">
      <div className="bg-white w-[95%] h-[90%] rounded-md flex flex-col justify-between p-5 overflow-auto relative">
        <div
          onClick={onClose}
          className="text-white bg-red-500 p-2 rounded-sm cursor-pointer absolute top-3 right-3"
        >
          X
        </div>
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
            <div className="flex justify-between items-center">
              <h1 className=" text-4xl font-semibold text-[#212529] mb-3">
                Media
              </h1>
              <Search />
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Photos</p>
              <div className="flex gap-1 items-center justify-end sm:w-2/5 w-2/5">
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
                <button
                  disabled={selected.length < 1}
                  onClick={handleSelect2}
                  className="cursor-pointer rounded-md bg-blue-500  text-white px-4 py-1 flex gap-1 items-center"
                >
                  Select
                </button>
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
      </div>
    </div>
  );
};

export default SelectPhoto;
