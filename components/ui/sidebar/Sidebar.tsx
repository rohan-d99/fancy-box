import React, { HTMLAttributes, ReactNode } from "react";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Sidebar = ({ children, className }: SidebarProps) => {
  return (
    <div
      className={`max-w-[360px] p-7 h-[calc(100vh-60px)] bg-white ${className}`}
    >
      {children}
    </div>
  );
};

export default Sidebar;
