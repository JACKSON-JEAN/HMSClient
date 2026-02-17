import { CircleX, Plus, Search } from "lucide-react";
import Button from "@mui/material/Button";
import React from "react";

interface ListNavProps {
  searchPlaceholder: string;
  onAdd: () => void;
  addLabel: string;
  onSearch?: (value: string) => void;
  searchValue?: string;
  actions?: React.ReactNode;
}

const NavList = ({ searchPlaceholder, onAdd, addLabel, onSearch, searchValue, actions }: ListNavProps) => {
  return (
    <div className=" w-full mb-4 flex items-center gap-4 justify-between">
      <div className="relative w-[300px]">
        <Search
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
        {searchValue && <CircleX onClick={() =>onSearch?.("")} size={14} className=" absolute right-2 top-2.5 cursor-pointer text-gray-500"/>}
      </div>
      <div className=" flex items-center gap-4">
        {actions}
        <Button size="medium" onClick={onAdd} variant="contained">
          <Plus size={21} />
          <span className=" hidden sm:block">{addLabel}</span>
        </Button>
      </div>
    </div>
  );
};

export default NavList;
