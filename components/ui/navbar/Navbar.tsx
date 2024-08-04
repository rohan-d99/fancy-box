"use client";

import React, { HTMLAttributes } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {}

const Navbar = ({ className }: NavbarProps) => {
  const currPath = usePathname();

  return (
    <div
      className={`flex justify-between align-middle w-full py-4 px-7 h-[60px] border-b-2 border-gray-200 bg-gradient-radial ${className}`}
    >
      <Link href="/">
        <h2 className="bg-logo-color inline-block text-transparent bg-clip-text text-xl font-extrabold">
          FancyBox
        </h2>
      </Link>
      <Link
        href="/examples"
        className={`text-base cursor-pointer font-bold text-gray-700 translate-y-[2px] ${
          currPath === "/examples" ? "text-purple-600" : ""
        }`}
      >
        Examples
      </Link>
    </div>
  );
};

export default Navbar;
