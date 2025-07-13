import { MdOutlineLocalLibrary } from "react-icons/md";
import img_dgca from "../assets/img_dgca.png"
import img_logo from "../assets/img_logo.png"
import img_bcab from "../assets/img_bcab.png"
import img_airports from "../assets/img_airports.png"
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { LiaTimesSolid } from "react-icons/lia";
import { useState } from "react";
import { NavLink } from "react-router-dom";



export default function Header() {
  const [hamb, setHamb] = useState(false)
  const linkClasses = ({ isActive }) =>
    `relative py-2 w-fit border-b-[3px] transition 
     ${isActive ? "border-yellow-400" : "border-transparent hover:border-yellow-400"}`;
  return (
    <header className="flex flex-col">
      <div className="bg-gradient-to-r from-[#0257a7] to-[#9bceed] flex justify-between  items-center md:px-10 px-5 py-3">

        <div className="flex flex-col md:items-end space-y-3">
          <div className="flex items-end space-x-3">
            <img
              src={img_logo}
              alt="IAA Logo"
              className="md:h-11 h-9"
            />
            <div className="text-white">
              <h1 className="md:text-lg text-sm leading-4 font-semibold">Indian Aviation Academy</h1>
              <p className="md:text-sm text-xs leading-4">Nurturing Aviation for the Future</p>
            </div>
          </div>
          <div className="md:hidden flex items-center gap-3 ms-[-2px]">
            <MdOutlineLocalLibrary className="inline text-3xl text-white" />
            <p className="capitalize font-semibold text-white">digital library system</p>
          </div>
        </div>

        <div onClick={() => setHamb(true)} className="md:hidden flex cursor-pointer">
          <GiHamburgerMenu className="text-white text-2xl" />
        </div>

        <div className="text-white font-semibold text-lg md:flex flex-col items-center hidden">
          <MdOutlineLocalLibrary className="inline text-3xl text-yellow-300" />Digital Library System
        </div>

        {/* Right: Government, DGCA, AAI logos */}
        <div className="md:flex items-center space-x-6 hidden">
          <img
            src={img_dgca}
            alt="Government of India Logo"
            className="h-20 w-auto"
          />
          <img
            src={img_bcab}
            alt="DGCA Logo"
            className="h-20 w-auto"
          />
          <img
            src={img_airports}
            alt="AAI Logo"
            className="h-20 w-auto"
          />
        </div>
      </div>
      <div className={`bg-white/90 backdrop-blur-md border-l border-gray-200 py-8 md:py-0 z-50 md:z-[unset] fixed md:relative top-0 right-0 md:h-auto h-full w-[80%] ${!hamb ? 'translate-x-full md:translate-x-0' : 'translate-x-0'} transition-transform duration-300 ease-in-out md:w-full shadow-2xl px-6 overflow-y-auto`}>
        <div className="text-end md:hidden">
          <LiaTimesSolid onClick={() => setHamb(false)} className="inline cursor-pointer text-2xl" />
        </div>
        <nav className="flex md:flex-row flex-col justify-between md:items-center max-w-7xl mx-auto">
          {/* Left links */}
          <div className="flex md:flex-row flex-col md:gap-6 gap-2">
            <NavLink
              onClick={() => setHamb(false)}
              to="/"
              className={linkClasses}
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setHamb(false)}
              to="/about"
              className={linkClasses}
            >
              About
            </NavLink>
            <NavLink
              onClick={() => setHamb(false)}
              to="/contact"
              className={linkClasses}
            >
              Contact Us
            </NavLink>
          </div>

          {/* Right links */}
          <div className="flex md:flex-row flex-col md:gap-6 gap-2 mt-2 md:mt-0">
            <NavLink
              onClick={() => setHamb(false)}
              to="/login"
              className={linkClasses}
            >
              Login
            </NavLink>
            <NavLink
              onClick={() => setHamb(false)}
              to="/signup"
              className={linkClasses}
            >
              Signup
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}