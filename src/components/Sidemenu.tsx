import React from "react";
import { SquareActivity } from "lucide-react";
import { menuConfig } from "../config/menu.config";
import { NavLink } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

const Sidemenu: React.FC<Props> = ({ open, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-20 md:hidden cursor-pointer"
        />
      )}
      <nav
        className={`
  fixed inset-y-0 left-0 w-[200px]
  bg-white h-screen border-r z-30
  transform transition-transform duration-300 ease-in-out
  ${open ? "translate-x-0" : "-translate-x-full"}
  md:relative md:translate-x-0
`}
      >
        <div className=" h-[50px] flex items-center gap-1 px-6 border-b">
          <SquareActivity size={25} color="green" />{" "}
          <h1 className=" text-2xl font-bold">Clinicare</h1>
        </div>
        <ul className="h-[calc(100%-50px)] overflow-y-auto py-5 px-4 text-sm">
          {menuConfig.map((item, index) => {
            //SECTION TITLE
            if (item.type === "section") {
              return (
                <p
                  key={`section-${index}`}
                  className=" px-3 mt-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                >
                  {item.section}
                </p>
              );
            }

            //MENU ITEM
            if (item.type === "item") {
              const Icon = item.icon;

              return (
                <NavLink
                  onClick={onClose}
                  to={item.path}
                  key={item.path}
                  className={({ isActive }) =>
                    `flex gap-1 items-center px-3 py-2 mb-2 rounded-sm font-medium cursor-pointer transition-colors duration-150 ease-in-out ${isActive ? "bg-slate-100 text-green-600" : " text-gray-700 hover:bg-slate-100 hover:text-green-600"}`
                  }
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            }

            return null;
          })}
        </ul>
      </nav>
    </>
  );
};

export default Sidemenu;
