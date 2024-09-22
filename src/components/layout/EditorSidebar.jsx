import { NavLink } from "react-router-dom";
import { SiCoursera } from "react-icons/si";
import { FaBlog, FaPlus, FaImage } from "react-icons/fa";

const sidebar = () => {
  const linkClass = ({ isActive }) => {
    return isActive
      ? "text-gray-100 text-lg flex items-center gap-1"
      : "text-gray-400 hover:text-gray-100 transition text-lg flex items-center gap-1";
  };
  return (
    <div className="fixed top-0 w-[225px] bg-[#212529] h-screen pt-20 px-5 lg:flex hidden">
      <nav className="w-full h-full flex flex-col">
        <div className="flex flex-col gap-0">
          <p className="text-gray-500 text-lg my-2">Properties</p>
          <div className="px-2 gap-2 flex flex-col">
            <NavLink to={"/properties"} className={linkClass}>
              <SiCoursera /> Properties
            </NavLink>

            <NavLink to={"/addproperties"} className={linkClass}>
              <FaPlus /> Add Property
            </NavLink>
          </div>
          <p className="text-gray-500 text-lg my-2">Blogs</p>
          <div className="px-2 gap-2 flex flex-col">
            <NavLink to={"/blogs"} className={linkClass}>
              <FaBlog /> Blogs
            </NavLink>
            <NavLink to={"/addblogs"} className={linkClass}>
              <FaPlus /> Add Blog
            </NavLink>
          </div>
          <p className="text-gray-500 text-lg my-2">Media</p>
          <div className="px-2 gap-2 flex flex-col">
            <NavLink to={"/media"} className={linkClass}>
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
  );
};

export default sidebar;
