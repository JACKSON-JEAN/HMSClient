import { ChevronDown, Plus, Search, SlidersHorizontal } from "lucide-react";
import Button from "./ui/Button";

interface ListNavProps {
  searchPlaceholder: string;
  onAdd: () => void;
  addLabel: string;
}

const ListNav = ({ searchPlaceholder, onAdd, addLabel }: ListNavProps) => {
  return (
    <div className="w-full mb-4 space-y-2 lg:flex lg:items-center lg:justify-between lg:space-y-0">
      {/* LEFT */}
      <div className="space-y-2 md:flex md:items-center md:gap-4 md:space-y-0 w-full md:w-auto">
        {/* Search */}
        <div className="relative w-full md:w-[300px]">
          <Search
            size={14}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-sm pl-7 pr-2 py-1.5 outline-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-2 md:justify-start">
          <div className="flex gap-2">
            <button className="flex items-center gap-1 border border-gray-300 text-gray-600 px-2 py-1 rounded-sm hover:bg-gray-100">
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filter</span>
            </button>

            <button className="flex items-center gap-1 border border-gray-300 text-gray-600 px-2 py-1 rounded-sm hover:bg-gray-100">
              <span className="hidden sm:inline">All Status</span>
              <ChevronDown size={16} />
            </button>
          </div>
          {/* Add Patient (mobile inline) */}
          <div className="md:hidden">
            <Button onClick={() => onAdd}>
              <span className="hidden sm:inline">All Status</span>
              <Plus size={17} />
            </Button>
          </div>
        </div>
      </div>

      {/* ADD (desktop) */}
      <div className="hidden md:block">
        <Button onClick={onAdd}>
          <Plus size={17} />
          <span>{addLabel}</span>
        </Button>
      </div>
    </div>
  );
};

export default ListNav;
