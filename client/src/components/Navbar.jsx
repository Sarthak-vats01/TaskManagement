import React, { useState } from "react";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineKeyboardArrowDown, MdMenu } from "react-icons/md";
import { FaCircleNotch } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

function Navbar({ setShowForm, onLogout }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <section className="bg-white border-b border-gray-300 flex justify-between items-center p-4 shadow-md">
      {/* Left section */}
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <LuListTodo className="text-xl" />
          <span className="font-semibold text-lg">Boards/Tasks</span>
        </div>
        {/* Hamburger menu icon for mobile screens */}
        <MdMenu
          className="text-2xl cursor-pointer md:hidden"
          onClick={toggleMenu}
        />
      </div>

      {/* Menu items */}
      <div
        className={`${
          showMenu ? "flex" : "hidden"
        } md:flex flex-col md:flex-row md:space-x-2 md:space-y-0`}
      >
        <div className="flex items-center space-x-2 cursor-pointer">
          <span className="font-medium">Boards</span>
          <MdOutlineKeyboardArrowDown className="text-xl" />
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <span className="font-medium">Templates</span>
          <MdOutlineKeyboardArrowDown className="text-xl" />
        </div>
        <div
          className="font-medium cursor-pointer"
          onClick={() => setShowForm(true)}
        >
          Create
        </div>
      </div>

      {/* Right section */}
      <div className="relative flex items-center mr-5 cursor-pointer">
        <FaCircleNotch className="text-4xl animate-spin" />
        <span className="absolute text-lg font-semibold inset-0 flex justify-center items-center">
          <AiOutlineLogout className="text-red-500" onClick={onLogout} />
        </span>
      </div>
    </section>
  );
}

export default Navbar;
