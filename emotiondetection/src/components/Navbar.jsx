import React from 'react';
import logo from '../images/logo.png'; // Update the path according to your project's structure

function Navbar() {
  return (
    <div className="flex justify-start p-5">
      <div className="logo flex flex-col items-center bg-white/30 rounded-[50px] pr-5 pl-5 pt-2 pb-2">
        <img src={logo} alt="Logo" className="h-8 w-16" /> {/* Adjust the height as needed */}
        <p className="text-center font-semibold">EmoTrack AI</p>
      </div>
    </div>
  );
}

export default Navbar;

