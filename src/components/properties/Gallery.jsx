import { useState } from "react";
import SelectPhoto from "../blogs/SelectPhoto";

const Gallery = ({ photos, setPhotos, onClose }) => {
  const [backup, setBackup] = useState(photos);
  const [showSelect, setShowSelect] = useState(false);
  const handlePhotoRemove = (url) => {
    setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.url !== url));
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
      <div className="bg-white w-[92%] h-[92%] rounded-md flex flex-col justify-between p-5 overflow-auto">
        <div>
          <div className="flex items-center gap-1 justify-end">
            <button
              onClick={() => setShowSelect(true)}
              className="cursor-pointer rounded-md bg-blue-500  text-white px-4 py-1"
            >
              Add
            </button>
            {showSelect && (
              <SelectPhoto
                multple={true}
                setImgId={setPhotos}
                onClose={() => {
                  setShowSelect(false);
                }}
              />
            )}
          </div>
          <div className="photo-list grid grid-cols-3 gap-4 mt-4">
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
            {/* {photos?.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={photo.url}
                alt="Selected"
                className="w-full h-40 object-cover rounded-md shadow-md"
              />
              <button
                onClick={() => handlePhotoRemove(photo.url)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full"
              >
                Remove
              </button>
            </div>
          ))} */}
          </div>
        </div>

        <div className="flex items-center gap-1 justify-end my-4">
          <button
            onClick={() => {
              setPhotos(backup);
              onClose();
            }}
            className="cursor-pointer rounded-md bg-red-500  text-white px-4 py-1"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-md bg-blue-500  text-white px-4 py-1"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
