import { Bell, ChevronDown, Menu } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  onMenuClick: () => void;
  title: string;
};

const NavigationBar: React.FC<Props> = ({ onMenuClick, title }) => {
  return (
    <nav className=" sticky top-0 z-10 h-[50px] bg-white w-full border-b flex items-center justify-between px-4">
      <div className=" flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className=" md:hidden flex justify-center items-center gap-1 rounded-sm hover:text-gray-600 text-black cursor-pointer"
        >
          <Menu size={16} />
        </button>
        <p className="font-semibold capitalize whitespace-nowrap text-lg">{title}</p>
      </div>
      <section className=" flex items-center gap-5">
        <Link
          to="/notifications"
          className=" border border-gray-300 rounded-sm p-0.5 text-gray-500 hover:bg-gray-50"
        >
          <Bell size={16} />
        </Link>
        <div className=" flex items-center gap-2.5">
          <div className=" border w-9 h-9 rounded-full bg-slate-200"></div>
          <div className=" hidden sm:block -space-y-1">
            <p className=" text-sm">Dr. Hilary</p>
            <p className=" text-xs text-gray-500">Doctor</p>
          </div>
          <p className=" text-gray-500 hover:text-gray-700 cursor-pointer">
            <ChevronDown size={17} />
          </p>
        </div>
      </section>
    </nav>
  );
};

export default NavigationBar;
