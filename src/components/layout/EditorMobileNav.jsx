import { NavLink } from "react-router-dom";
import { FaPlus, FaImage, FaBlog } from "react-icons/fa";
import { SiCoursera } from "react-icons/si";

const mobileNav = ({ onclose }) => {
  const linkClass = ({ isActive }) => {
    return isActive
      ? "text-gray-100 text-lg flex gap-2 items-center"
      : "text-gray-400 hover:text-gray-100 transition text-lg flex gap-2 items-center";
  };
  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-40 w-screen h-screen">
      <div className="fixed left-0 top-0 w-[225px] bg-[#212529] h-screen pt-4 px-5 flex">
        <div
          onClick={() => onclose()}
          className="text-white absolute top-2 right-2 bg-gray-700 px-2 py-1 cursor-pointer"
        >
          X
        </div>
        <nav className="w-full h-full flex flex-col">
          <div className="flex flex-col gap-0">
            <p className="text-gray-500 text-lg my-2">Properties</p>
            <div className="px-2 gap-2 flex flex-col">
              <NavLink
                to={"/properties"}
                className={linkClass}
                onClick={() => onclose()}
              >
                <SiCoursera /> Properties
              </NavLink>

              <NavLink
                to={"/addproperties"}
                className={linkClass}
                onClick={() => onclose()}
              >
                <FaPlus /> Add Property
              </NavLink>
            </div>
            <p className="text-gray-500 text-lg my-2">Blogs</p>
            <div className="px-2 gap-2 flex flex-col">
              <NavLink
                to={"/blogs"}
                className={linkClass}
                onClick={() => onclose()}
              >
                <FaBlog /> Blogs
              </NavLink>
              <NavLink
                to={"/addblogs"}
                className={linkClass}
                onClick={() => onclose()}
              >
                <FaPlus /> Add Blog
              </NavLink>
            </div>
            <p className="text-gray-500 text-lg my-2">Media</p>
            <div className="px-2 gap-2 flex flex-col">
              <NavLink
                to={"/media"}
                className={linkClass}
                onClick={() => onclose()}
              >
                <FaImage /> Photos
              </NavLink>
            </div>
            <div>
              <p className="text-gray-500 text-lg mt-2">Logged in as:</p>
              <p className="text-gray-400 font-semibold">Editor</p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default mobileNav;
