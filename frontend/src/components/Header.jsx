import React from "react";
import { MdOutlineLocalLibrary } from "react-icons/md";
import img_dgca from "../assets/img_dgca.png"
import img_logo from "../assets/img_logo.png"
import img_bcab from "../assets/img_bcab.png"
import img_airports from "../assets/img_airports.png"
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header className="flex flex-col">
      <div className="bg-gradient-to-r from-[#0257a7] to-[#9bceed] flex justify-between items-center px-10 py-3">

        <div className="flex items-end space-x-3">
          <img
            src={img_logo}
            alt="IAA Logo"
            className="h-11 w-auto"
          />
          <div className="text-white">
            <h1 className="text-lg leading-4 font-semibold">Indian Aviation Academy</h1>
            <p className="text-sm leading-4">Nurturing Aviation for the Future</p>
          </div>
        </div>

        <div className="text-white font-semibold text-lg flex flex-col items-center">
          <MdOutlineLocalLibrary className="inline text-3xl text-yellow-300" /> Digital Library System
        </div>

        {/* Right: Government, DGCA, AAI logos */}
        <div className="flex items-center space-x-6">
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
      <div className="bg-white shadow-sm px-6">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Left links */}
          <div className="flex gap-6">
            <Link
              to="/"
              className="relative py-2 border-white border-b-[3px] hover:border-yellow-400 transition"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="relative py-2 border-white border-b-[3px] hover:border-yellow-400 transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="relative py-2 border-white border-b-[3px] hover:border-yellow-400 transition"
            >
              Contact Us
            </Link>
          </div>

          {/* Right links */}
          <div className="flex gap-6">
            <Link
              to="/login"
              className="relative py-2 border-white border-b-[3px] hover:border-yellow-400 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="relative py-2 border-white border-b-[3px] hover:border-yellow-400 transition"
            >
              Signup
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}