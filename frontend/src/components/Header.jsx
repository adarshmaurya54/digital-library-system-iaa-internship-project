import React from "react";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#0257a7] to-[#9bceed] flex justify-between items-center px-10 py-3">
      {/* Left: Logo and Title */}
      <div className="flex items-end space-x-3">
        <img
          src="https://iaa.edu.in/public/front_assets/img/img_optimized_landing/img_logo.png"
          alt="IAA Logo"
          className="h-11 w-auto"
        />
        <div className="text-white">
          <h1 className="text-lg leading-4 font-semibold">Indian Aviation Academy</h1>
          <p className="text-sm leading-4">Nurturing Aviation for the Future</p>
        </div>
      </div>

      {/* Right: Government, DGCA, AAI logos */}
      <div className="flex items-center space-x-6">
        <img
          src="https://iaa.edu.in/public/front_assets/img/img_optimized_landing/img_dgca.png"
          alt="Government of India Logo"
          className="h-20 w-auto"
        />
        <img
          src="https://iaa.edu.in/public/front_assets/img/img_optimized_landing/img_bcab.png"
          alt="DGCA Logo"
          className="h-20 w-auto"
        />
        <img
          src="https://iaa.edu.in/public/front_assets/img/img_optimized_landing/img_airports.png"
          alt="AAI Logo"
          className="h-20 w-auto"
        />
      </div>
    </header>
  );
}