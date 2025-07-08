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
      <div className="bg-white py-3 px-9">
        <nav className="flex justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/contact" className="hover:underline">Contact us</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}