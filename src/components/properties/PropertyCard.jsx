import ConfirmationModal from "../general/confrim";
import { useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import Toast from "../general/toast";
import PatchData from "../../hooks/PatchData";
import UpdateProperties from "./UpdateProperties";

const PropertyCard = ({ property, reFetch, setProperty, select, onClose }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [showConfirm, setshowConfirm] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleDelete = async () => {
    const [response, resJson] = await PatchData(
      `${baseURL}/admins/properties/${property._id}`,
      "DELETE"
    );
    if (!response.ok) {
      setMessage(resJson.message);
      setSeverity("danger");
      setShowToast(true);
      return;
    }
    setMessage(resJson.message);
    setShowToast(true);
    setSeverity("success");
    reFetch();
  };

  const [imgHasError, setImgHasError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const handleImgError = () => {
    setImgHasError(true);
    setImgLoading(false);
  };

  const handleLoad = () => {
    setImgLoading(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString).toLocaleDateString("en-US", options);
    const time = new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${date} ${time}`;
  };

  return (
    <div
      onClick={() => {
        if (select) {
          setProperty(property);
          onClose();
        }
      }}
      className={`bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-gray-300 rounded-lg p-5 font-roboto ${
        select && "cursor-pointer"
      }`}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {showToast && (
          <Toast
            onClose={() => setShowToast(false)}
            message={message}
            severity={severity}
          />
        )}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
          <div className="lg:w-64 lg:h-64 w-full h-64 flex-shrink-0">
            <div className="w-full h-full relative">
              {imgLoading && (
                <div className="absolute w-full h-full bg-gray-200 flex items-center justify-center">
                  <div
                    className={`border-8 border-t-8 border-gray-200 border-t-blue-500 rounded-full animate-spin h-8 w-8`}
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              {imgHasError ? (
                <div className="bg-gray-200 shadow-inner w-full h-full rounded-lg flex items-center justify-center">
                  <FaImage className="text-6xl text-blue-300" />
                </div>
              ) : (
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={property?.featuredImage?.url}
                  onLoad={handleLoad}
                  onError={handleImgError}
                  alt="course"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="text-gray-700">
              <h3 className="text-xl font-bold">{property?.name}</h3>
              <p className="text-sm text-gray-500">{property?.category}</p>
            </div>

            <div className="text-sm text-gray-600 flex flex-col gap-2">
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {property?.description.split("").slice(0, 250).join("")}
              </p>
              <p>
                <span className="font-semibold">Air Condition:</span>{" "}
                {property?.airCon.toString()}
              </p>
              <p>
                <span className="font-semibold">Bedding:</span>{" "}
                {property?.bedding}
              </p>
              <p>
                <span className="font-semibold">Max Occupancy:</span>{" "}
                {property?.maxOccupancy}
              </p>
              <p>
                <span className="font-semibold">Available:</span>{" "}
                {property?.availabile.toString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between w-full lg:w-auto lg:ml-auto">
          <div>
            <p>
              <span className="font-semibold">Price:</span>{" "}
              {`$${property?.price}`}
            </p>
            <p className="text-nowrap">
              <span className="font-semibold">Surface Area:</span>{" "}
              {property?.surfaceArea}
            </p>
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <MdEdit
              onClick={() => setShowUpdate(true)}
              className="text-2xl cursor-pointer bg-blue-500 text-white w-10 h-10 p-2 rounded-full hover:bg-blue-600 transition"
            />
            <MdDeleteForever
              onClick={() => setshowConfirm(true)}
              className="text-2xl cursor-pointer bg-red-500 text-white w-10 h-10 p-2 rounded-full hover:bg-red-600 transition"
            />

            {showConfirm && (
              <ConfirmationModal
                goBack={() => setshowConfirm((prev) => !prev)}
                handleDelete={handleDelete}
              />
            )}

            {showUpdate && (
              <UpdateProperties
                property={property}
                onClose={() => setShowUpdate(false)}
                reFetch={reFetch}
                setShowToast={setShowToast}
                setSeverity={setSeverity}
                setMessage={setMessage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
