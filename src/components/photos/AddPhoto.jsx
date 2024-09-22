import { useState } from "react";
import ClockLoader from "../general/ClockLoader";

const AddPhoto = ({
  onClose,
  setShowToast,
  setToastMsg,
  setSevrity,
  reFetch,
}) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;

  const handlePhotoChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newPhotos = selectedFiles
      .filter((file) => {
        // Check if file size is less than or equal to 3MB
        if (file.size > 3 * 1024 * 1024) {
          alert(`${file.name} is larger than 3MB and cannot be uploaded.`);
          return false;
        }
        return true;
      })
      .map((file) => {
        return {
          file: file,
          url: URL.createObjectURL(file), // Create a preview URL for each photo
        };
      });

    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handlePhotoRemove = (url) => {
    setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.url !== url));
  };

  const handleAdd = async () => {
    setLoading(true);
    const formData = new FormData();
    photos.forEach((photo) => {
      formData.append("photos", photo.file);
    });
    const response = await fetch(`${baseURL}/admins/photos`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });
    const resJson = await response.json();
    setLoading(false);
    if (response.ok) {
      setToastMsg(resJson.message);
      setShowToast(true);
      onClose();
      reFetch();
      return;
    }
    setSevrity("danger");
    setToastMsg(resJson.message);
    setShowToast(true);
  };

  function divideArray(arr, groupCount) {
    let result = Array.from({ length: groupCount }, () => []);

    arr?.forEach((element, index) => {
      const groupIndex = index % groupCount; // Determine which group it belongs to
      result[groupIndex].push(element); // Push the element to the correct group
    });

    return result;
  }

  const toMap = divideArray(photos, 3);
  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-45 flex justify-center items-center w-screen h-screen z-40">
      {loading && <ClockLoader />}
      <div className="bg-white p-6 rounded-md w-[92%] h-[93%] flex flex-col justify-between overflow-auto">
        <div>
          <div className="photo-upload">
            <label
              htmlFor="photo-upload"
              className="custom-photo-upload border border-black p-3 rounded-sm cursor-pointer"
            >
              Choose Photos
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              className="hidden"
            />

            <div className="photo-list grid md:grid-cols-3 sm:col-span-2 col-span-1 gap-4 mt-4">
              {toMap?.map((photo, index) => {
                return (
                  <div className="col-span-1 flex flex-col gap-4">
                    {photo.map((phot) => {
                      return (
                        <div
                          key={index}
                          className="relative border border-gray-300"
                        >
                          <img
                            src={phot.url}
                            alt="Selected"
                            className="w-full  object-cover rounded-md shadow-md "
                          />
                          <button
                            onClick={() => handlePhotoRemove(phot.url)}
                            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              {/* {photos.map((phot) => {
                return (
                  <div key={index} className="relative">
                    <img
                      src={phot.url}
                      alt="Selected"
                      className="w-full  object-cover rounded-md shadow-md "
                    />
                    <button
                      onClick={() => handlePhotoRemove(phot.url)}
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full"
                    >
                      Remove
                    </button>
                  </div>
                );
              })} */}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 justify-end my-4">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-md bg-red-500  text-white px-4 py-1"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="cursor-pointer rounded-md bg-blue-500  text-white px-4 py-1"
          >
            Add Photos
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPhoto;
