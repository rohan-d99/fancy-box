import React, { HTMLAttributes } from "react";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {}

const Navbar = ({ className }: NavbarProps) => {
  return (
    <div
      className={`flex justify-between align-middle w-full py-4 px-7 h-[60px] border-b-2 border-gray-200 bg-gradient-radial ${className}`}
    >
      <h2 className="bg-logo-color inline-block text-transparent bg-clip-text text-xl font-extrabold">
        FancyBox
      </h2>
      <p className="text-base cursor-pointer font-medium text-gray-700">
        Examples
      </p>
    </div>
  );
};

export default Navbar;
