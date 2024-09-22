import { useState } from "react";
import TextEditor from "./TextEditor";
import { FaPlus, FaTrash } from "react-icons/fa";
import SelectPhoto from "./SelectPhoto";
import PatchData from "../../hooks/PatchData";
import ClockLoader from "../general/ClockLoader";

const UpdateBlog = ({
  blog,
  onClose,
  setShowToast,
  setSevrity,
  setToastMsg,
  reFetch,
}) => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [showEditor, setShowEditor] = useState(false);
  const [title, setTitle] = useState(blog?.title);
  const [author, setAuthor] = useState(blog?.author);
  const [excrept, setExcrept] = useState(blog?.excrept);
  const [content, setContent] = useState(blog?.content);
  const [metaDesc, setMetaDesc] = useState(blog?.metaDescription);
  const [metaTitle, setMetaTitle] = useState(blog?.metaTitle);
  const [metaTags, setMetatags] = useState(blog?.metaTags);
  const [tags, setTags] = useState(blog?.tags);
  const [imgId, setImgId] = useState(blog?.image);
  const [publishDate, setPublishDate] = useState(blog?.publishDate);
  const [loading, setLoading] = useState(false);

  const [tagValue, setTagValue] = useState("");
  const [tagValue1, setTagValue1] = useState("");
  const [showAddPhoto, setShowAddPhoto] = useState(false);

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
    setLoading(true);
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
      `${baseURL}/admins/blogs/${blog._id}`,
      "PATCH",
      updBlog
    );
    if (!response.ok) {
      setLoading(false);
      setShowToast(true);
      setToastMsg(resJson.message);
      setSevrity("danger");
      return;
    }
    setShowToast(true);
    setToastMsg(resJson.message);
    setSevrity("success");
    onClose();
    reFetch();
    setLoading(false);
  };

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-45 flex justify-center items-center w-screen h-screen z-40">
      {loading && <ClockLoader />}
      <div className="bg-white w-[92%] h-[92%] rounded-md flex flex-col justify-between p-5 overflow-auto">
        <div className="flex md:flex-row flex-col gap-2">
          <div>
            <div className="flex flex-col gap-2">
              <div className="md:w-72 w-full">
                <img src={imgId.url} alt="" />
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
                <p>{formatDate(publishDate)}</p>
                <input
                  className="border border-gray-300 px-4 py-2 w-full rounded-sm"
                  onChange={handleDateChange}
                  type="date"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-1 mb-1">
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
              <div className="flex flex-wrap gap-2 items-center">
                <input
                  value={tagValue}
                  onChange={(e) => setTagValue(e.target.value)}
                  type="text"
                  className="px-2 py-2 border border-gray-300 rounded-md sm:w-56 w-full"
                />
                <div
                  onClick={handleTagAdd}
                  className="cursor-pointer flex justify-center gap-1 items-center bg-blue-500 text-white px-4 py-1 sm:w-auto  w-full rounded-sm h-full"
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
              <div className="flex gap-2 items-center flex-wrap">
                <input
                  value={tagValue1}
                  onChange={(e) => setTagValue1(e.target.value)}
                  type="text"
                  className="px-2 py-2 border border-gray-300 rounded-md sm:w-56 w-full"
                />
                <div
                  onClick={handleTagAdd1}
                  className="cursor-pointer flex gap-1 items-center bg-blue-500 justify-center w-full sm:w-auto text-white px-4 py-1 rounded-sm h-full"
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
                className="px-5 py-2 bg-blue-500 rounded-md text-white my-4 md:w-24 w-full"
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
            onClick={onClose}
            className="cursor-pointer rounded-md bg-red-500  text-white px-4 py-1"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="cursor-pointer rounded-md bg-blue-500  text-white px-4 py-1"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
