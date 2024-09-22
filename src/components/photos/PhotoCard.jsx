import { FaCheckCircle } from "react-icons/fa";

const PhotoCard = ({ photos, selected, handleSelect }) => {
  return (
    <>
      {photos?.map((arr, i) => {
        return (
          <div key={i} className="lg:col-span-1 col-span-3">
            {arr?.map((photo, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleSelect(photo._id)}
                  className="w-full mb-3 relative border-gray-300 border"
                >
                  <div className="absolute top-2 right-2 p-2 cursor-pointer">
                    {selected.includes(photo._id) ? (
                      <FaCheckCircle className="text-blue-500 text-xl" />
                    ) : null}
                  </div>
                  <img
                    className="w-full h-full object-cover cursor-pointer"
                    src={photo.url}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default PhotoCard;
