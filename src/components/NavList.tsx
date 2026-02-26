import { Funnel, Plus } from "lucide-react";
import Button from "./ui/Button";
import React from "react";

interface ListNavProps {
  searchPlaceholder: string;
  onAdd: () => void;
  onOpen: () => void;
  addLabel: string;
  onSearch?: (value: string) => void;
  searchValue?: string;
  actions?: React.ReactNode;
  title?: string;
  subTitle?: string;
}

const NavList = ({
  searchPlaceholder,
  onAdd,
  onOpen,
  addLabel,
  onSearch,
  searchValue,
  actions,
  title,
  subTitle,
}: ListNavProps) => {
  return (
    <div className=" w-full mb-2">
      <div className="relative flex justify-between">
        <div>
          <p className=" text-gray-600 text-xl font-semibold capitalize">
            {title}
          </p>
          {/* <p className=" text-sm text-gray-600">{subTitle}</p> */}
        </div>

        <div className=" flex items-center gap-4">
          <Button className=" md:hidden" onClick={onOpen}>
            <Funnel size={22} />
            <span className=" hidden sm:block">Filters</span>
          </Button>
          {actions}
          <Button onClick={() => onAdd}>
            <Plus size={23} />
            <span className=" hidden sm:block">{addLabel}</span>
          </Button>
        </div>

        {/* <Search
          size={14}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) =>onSearch?.(e.target.value)}
          className="w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-sm pl-7 pr-2 py-1.5 outline-blue-500"
        />
        {searchValue && <CircleX onClick={() =>onSearch?.("")} size={14} className=" absolute right-2 top-2.5 cursor-pointer text-gray-500"/>} */}
      </div>
    </div>
  );
};

export default NavList;
