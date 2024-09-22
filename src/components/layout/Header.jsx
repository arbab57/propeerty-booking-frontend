import { useState } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import MobileNav from "./mobileNav";
import { Link } from "react-router-dom";
import Modal from "./modal";
import Clock from "./clock";
import Dropdown from "./Dropdown";
import EditorMobileNav from "./EditorMobileNav";

const Header = () => {
  const [showNav, setshowNav] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setshowDropdown] = useState(false);

  const [role, setRole] = useState(
    JSON.parse(localStorage.getItem("role"))?.role
  );

  const close = () => {
    setshowDropdown(false);
  };
  return (
    <div className="fixed left-0 top-0 bg-[#212529] h-[55px] w-full z-10 font-roboto flex items-center justify-between sm:px-5 px-2">
      <div className="flex items-center gap-12">
        <div className="text-white font-medium text-2xl">
          <Link to={"/"}>DomainJordan</Link>
        </div>
        <Clock />
        <div></div>
      </div>
      <div className="flex gap-1">
        <div className="relative">
          <FaUser
            onClick={() => setshowDropdown((prev) => !prev)}
            className="text-gray-500 text-2xl cursor-pointer"
          />

          {showModal && <Modal setShowModal={setShowModal} />}
          {showDropdown && <Dropdown />}
        </div>

        <div
          onClick={() => setshowNav((prev) => !prev)}
          className="cursor-pointer lg:hidden"
        >
          <FaBars className="text-white text-xl  w-12 h-7" />
        </div>

        {showNav && role === "superAdmin" && (
          <MobileNav onclose={() => setshowNav((prev) => !prev)} />
        )}
        {showNav && role === "editor" && (
          <EditorMobileNav onclose={() => setshowNav((prev) => !prev)} />
        )}
      </div>
    </div>
  );
};

export default Header;
