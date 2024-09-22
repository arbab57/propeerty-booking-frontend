import { useState } from "react";
import TextEditor from "../components/blogs/TextEditor";
import { FaPlus, FaTrash } from "react-icons/fa";
import SelectPhoto from "../components/blogs/SelectPhoto";
import PatchData from "../hooks/PatchData";
import Toast from "../components/general/toast";
import ClockLoader from "../components/general/ClockLoader";

const AddBlog = ({}) => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [showEditor, setShowEditor] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [excrept, setExcrept] = useState("");
  const [content, setContent] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaTags, setMetatags] = useState([]);
  const [tags, setTags] = useState([]);
  const [imgId, setImgId] = useState({});
  const [publishDate, setPublishDate] = useState("");

  const [tagValue, setTagValue] = useState("");
  const [tagValue1, setTagValue1] = useState("");
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [loading, setLoding] = useState(false);
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
  const handleTagDelete1 = (i) => {
    setTags((prev) => {
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

  const handleTagAdd1 = () => {
    if (tagValue1) {
      setTags((prev) => {
        return [...prev, tagValue1];
      });
      setTagValue1("");
    }
  };

  const handleDateChange = (e) => {
    const timestamp = new Date(e.target.value).getTime();
    setPublishDate(timestamp);
  };

  const handleUpdate = async () => {
    setLoding(true);
    const updBlog = {
      title: title,
      content: content,
      author: author,
      publishDate: publishDate,
      tags: tags,
      excrept: excrept,
      imageId: imgId._id,
      metaTitle: metaTitle,
      metaDescription: metaDesc,
      metaTags: metaTags,
    };
    const [response, resJson] = await PatchData(
      `${baseURL}/admins/blogs`,
      "PUT",
      updBlog
    );
    if (response.ok) {
      setLoding(false);
      setToastMsg(resJson.message);
      setSevrity("success");
      setShowToast(true);
      setTitle("");
      setContent("");
      setAuthor("");
      setPublishDate("");
      setTags([]);
      setExcrept("");
      setImgId({});
      setMetaDesc("");
      setMetaTitle("");
      setMetatags([]);
      setTagValue("");
      setTagValue1("");
      return;
    }
    setLoding(false);
    setToastMsg(resJson.message);
    setSevrity("danger");
    setShowToast(true);
  };

  return (
    <>
      <div className="sm:px-6 py-6 px-2 font-poppins">
        {loading && <ClockLoader />}
        {showToast && (
          <Toast
            message={toastMsg}
            severity={severity}
            onClose={() => setShowToast(false)}
          />
        )}
        <div className="flex justify-between  items-end  ">
          <div className="flex justify-between items-end">
            <h1 className=" text-4xl font-semibold text-[#212529] mb-1">
              Add Blogs
            </h1>
          </div>
        </div>
        <p className="text-gray-500">New Blog</p>
        <div className="flex md:flex-row-reverse flex-col gap-2 py-4">
          <div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Image</p>

              <div className="md:w-72 w-full">
                <img src={imgId?.url} alt="" />
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
                    setImgId={setImgId}
                    onClose={() => {
                      setShowAddPhoto(false);
                    }}
                  />
                )}
              </div>
              <div className="mt-5">
                <p className="font-bold">Publish Date</p>
                <p>{publishDate ? formatDate(publishDate) : ""}</p>

                <input
                  className="border border-gray-300 px-4 py-2 w-full rounded-sm"
                  onChange={handleDateChange}
                  type="date"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-1 my-1">
              <p className="font-bold">Title</p>
              <input
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 my-1">
              <p className="font-bold">Author</p>
              <input
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 my-1">
              <p className="font-bold">Short description</p>
              <textarea
                className="px-2 py-2 border border-gray-300 rounded-md w-full"
                value={excrept}
                onChange={(e) => setExcrept(e.target.value)}
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
              <div className="flex gap-2 items-center">
                <input
                  value={tagValue}
                  onChange={(e) => setTagValue(e.target.value)}
                  type="text"
                  className="px-2 py-2 border border-gray-300 rounded-md w-56"
                />
                <div
                  onClick={handleTagAdd}
                  className="cursor-pointer flex gap-1 items-center bg-blue-500 text-white px-4 py-1 rounded-sm h-full"
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

            <div className="flex flex-col gap-1 my-1">
              <div className="flex gap-2 items-center">
                <p className="font-bold">Tags</p>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  value={tagValue1}
                  onChange={(e) => setTagValue1(e.target.value)}
                  type="text"
                  className="px-2 py-2 border border-gray-300 rounded-md w-56"
                />
                <div
                  onClick={handleTagAdd1}
                  className="cursor-pointer flex gap-1 items-center bg-blue-500 text-white px-4 py-1 rounded-sm h-full"
                >
                  Add
                  <FaPlus className="text-white text-md" />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {tags.map((tag, i) => {
                  return (
                    <div
                      key={i}
                      className="flex gap-3 px-4 py-1 text-white bg-blue-500 items-center justify-between rounded-sm"
                    >
                      <p className="">{tag}</p>
                      <div
                        onClick={() => handleTagDelete1(i)}
                        className="cursor-pointer"
                      >
                        <FaTrash className="text-red-500 text-md" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <button
                onClick={() => setShowEditor(true)}
                className="px-5 py-2 bg-blue-500 rounded-md text-white my-4"
              >
                Content
              </button>
              {showEditor && (
                <TextEditor
                  content={content}
                  setContent={setContent}
                  onClose={() => setShowEditor(false)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 justify-end">
          <button
            onClick={handleUpdate}
            className="cursor-pointer rounded-md bg-blue-500  text-white px-4 py-1 w-44"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
