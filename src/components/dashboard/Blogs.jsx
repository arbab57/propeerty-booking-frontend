import { useState } from "react";
import BlogCard from "./BlogCard";

const Blogs = ({ blogs }) => {
  const [mode, setMode] = useState("added");

  const toMap = mode === "added" ? blogs?.latestAdded : blogs?.latestUpated;
  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-[#212529] font-bold  text-xl">Blogs</p>
          <div>
            <select
              onChange={(e) => setMode(e.target.value)}
              className="border border-black rounded-sm"
              name=""
              id=""
            >
              <option value="added">Added</option>
              <option value="updated">Updated</option>
            </select>
          </div>
        </div>
        <div>
          {toMap?.map((blog, i) => {
            return <BlogCard mode={mode} key={i} blog={blog} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Blogs;
