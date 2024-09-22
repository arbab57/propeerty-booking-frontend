import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import SelectPhoto from "../components/blogs/SelectPhoto";
import PatchData from "../hooks/PatchData";
import Gallery from "../components/properties/Gallery";
import ClockLoader from "../components/general/ClockLoader";
import Toast from "../components/general/toast";

const AddProperty = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [name, setName] = useState("");
  const [airCon, setAirCon] = useState(false);
  const [available, setAvailable] = useState(true);
  const [bedding, setBedding] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaTags, setMetatags] = useState([]);
  const [category, setCategory] = useState("standard");
  const [price, setPrice] = useState("");
  const [maxOccupancy, setMaxOccupancy] = useState("");
  const [surfaceArea, setSurfaceArea] = useState("");
  const [description, setDescription] = useState("");
  const [featuredImage, setFeaturedImage] = useState({});
  const [photos, setPhotos] = useState([]);

  const [tagValue, setTagValue] = useState("");
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [severity, setSevrity] = useState("success");

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString).toLocaleDateString("en-US", options);
    const time = new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${date}`;
  };

  const handleTagDelete = (i) => {
    setMetatags((prev) => {
      const updated = prev.filter((ta, ind) => ind !== i);
      return updated;
    });
  };

  const handleTagAdd = () => {
    if (tagValue) {
      setMetatags((prev) => {
        return [...prev, tagValue];
      });
      setTagValue("");
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    const photoids = photos.map((phot) => phot._id);

    const newProperty = {
      name: name,
      maxOccupancy: maxOccupancy,
      surfaceArea: surfaceArea,
      bedding: bedding,
      airCon: airCon,
      price: price,
      availabile: available,
      category: category,
      featuredImageId: featuredImage._id,
      photosIds: photoids,
      metaTitle: metaTitle,
      metaDescription: metaDesc,
      metaTags: metaTags,
      description: description,
    };
    const [response, resJson] = await PatchData(
      `${baseURL}/admins/properties`,
      "PUT",
      newProperty
    );
    if (response.ok) {
      setName("");
      setMaxOccupancy("");
      setSurfaceArea("");
      setBedding("");
      setAirCon(false);
      setAvailable(true);
      setPrice("");
      setCategory("");
      setFeaturedImage({});
      setPhotos([]);
      setMetaDesc("");
      setMetatags([]);
      setMetaTitle("");
      setDescription("");
      setTagValue("");

      setLoading(false);
      setToastMsg(resJson.message);
      setSevrity("success");
      setShowToast(true);
      return;
    }
    setLoading(false);
    setToastMsg(resJson.message);
    setSevrity("danger");
    setShowToast(true);
  };

  return (
    <div className="sm:px-6 py-6 px-2 font-poppins">
      {loading && <ClockLoader />}
      {showToast && (
        <Toast
          message={toastMsg}
          severity={severity}
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="flex justify-between  items-end">
        <div className="flex justify-between items-end">
          <h1 className=" text-4xl font-semibold text-[#212529] mb-1">
            Add Property
          </h1>
        </div>
      </div>
      <p className="text-gray-500 mb-3">New Property</p>
      <div className="bg-white rounded-md flex flex-col justify-between overflow-auto py-4 ">
        <div className="flex md:flex-row-reverse flex-col gap-4">
          <div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Featuered Image</p>

              <div className="md:w-72 w-full">
                <img src={featuredImage?.url} alt="" />
              </div>
              <div className="">
                <button
                  onClick={() => setShowAddPhoto(true)}
                  className="px-5 py-2 w-full bg-blue-500 rounded-md text-white"
                >
                  Select
                </button>
                {showAddPhoto && (
                  <SelectPhoto
                    multple={false}
                    setImgId={setFeaturedImage}
                    onClose={() => {
                      setShowAddPhoto(false);
                    }}
                  />
                )}
              </div>
            </div>

            <div className="my-5">
              <p className="font-bold">Gallery Photos</p>
              <button
                onClick={() => setShowGallery(true)}
                className="px-4 py-2 bg-blue-500 rounded-md text-white w-full"
              >
                Gallery({photos.length})
              </button>
              {showGallery && (
                <Gallery
                  photos={photos}
                  setPhotos={setPhotos}
                  onClose={() => setShowGallery(false)}
                />
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-1 mb-1">
              <p className="font-bold">Name</p>
              <input
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex flex-col gap-1 my-1">
                <p className="font-bold">Category</p>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="border border-gray-300 rounded-sm"
                  name=""
                  id=""
                >
                  <option value={"premium"}>Premium</option>
                  <option selected={true} value={"standard"}>
                    Standard
                  </option>
                </select>
              </div>
              <div className="flex flex-col gap-1 my-1">
                <p className="font-bold">Air Condition</p>
                <select
                  onChange={(e) => setAirCon(e.target.value === "true")}
                  className="border border-gray-300 rounded-sm"
                  name=""
                  id=""
                >
                  <option value={true}>Available</option>
                  <option selected={true} value={false}>
                    Not Availabe
                  </option>
                </select>
              </div>
              <div className="flex flex-col gap-1 my-1">
                <p className="font-bold">Availability</p>
                <select
                  onChange={(e) => setAvailable(e.target.value === "true")}
                  className="border border-gray-300 rounded-sm"
                  name=""
                  id=""
                >
                  <option selected={true} value={true}>
                    Available
                  </option>
                  <option value={false}>Not Availabe</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-col gap-1 my-1">
                <p className="font-bold">Price</p>
                <input
                  className="px-2 py-2 border border-gray-300 rounded-md w-full"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                />
              </div>
              <div className="flex flex-col gap-1 my-1">
                <p className="font-bold">Surface Area</p>
                <div className="flex items-center gap-1">
                  <input
                    className="px-2 py-2 border border-gray-300 rounded-md w-full"
                    value={surfaceArea}
                    onChange={(e) => setSurfaceArea(e.target.value)}
                    type="number"
                  />
                  <span className="text-nowrap">square meters</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 my-1">
              <p className="font-bold">Max Occupancy</p>
              <input
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                value={maxOccupancy}
                onChange={(e) => setMaxOccupancy(e.target.value)}
                type="number"
              />
            </div>
            <div className="flex flex-col gap-1 my-1">
              <p className="font-bold">Bedding</p>
              <input
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                value={bedding}
                onChange={(e) => setBedding(e.target.value)}
                type="text"
              />
            </div>

            <div className="flex flex-col gap-1 my-1">
              <p className="font-bold">Description</p>
              <textarea
                rows={7}
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 my-1">
              <p className="font-bold">Meta description</p>
              <textarea
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 my-1">
              <p className="font-bold">Meta Title</p>
              <input
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 my-1">
              <div className="flex gap-2 items-center">
                <p className="font-bold">Meta Tags</p>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <input
                  value={tagValue}
                  onChange={(e) => setTagValue(e.target.value)}
                  type="text"
                  className="px-2 py-2 border border-gray-300 rounded-md sm:w-56 w-full"
                />
                <div
                  onClick={handleTagAdd}
                  className="cursor-pointer flex gap-1 items-center justify-center sm:w-auto w-full bg-blue-500 text-white px-4 py-1 rounded-sm h-full"
                >
                  Add
                  <FaPlus className="text-white text-md" />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {metaTags.map((tag, i) => {
                  return (
                    <div
                      key={i}
                      className="flex gap-3 px-4 py-1 text-white bg-blue-500 items-center justify-between rounded-sm"
                    >
                      <p className="">{tag}</p>
                      <div
                        onClick={() => handleTagDelete(i)}
                        className="cursor-pointer"
                      >
                        <FaTrash className="text-red-500 text-md" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 justify-end my-4">
          <button
            onClick={handleUpdate}
            className="cursor-pointer rounded-md bg-blue-500  text-white px-6 py-1 w-32"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
