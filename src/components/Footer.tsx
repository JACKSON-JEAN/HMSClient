import React from "react";

const Footer = () => {
  return (
    <div className=" bg-white border-t py-3">
      <p className="text-base capitalize flex justify-center text-gray-700">
        copyright &copy; {new Date().getFullYear()} Clinicare
      </p>
    </div>
  );
};

export default Footer;
