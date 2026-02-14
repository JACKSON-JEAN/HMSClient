import { Plus, Search } from "lucide-react";
import Button from "./ui/Button";

interface ListNavProps {
  searchPlaceholder: string;
  onAdd: () => void;
  addLabel: string;
}

const ListNav = ({ searchPlaceholder, onAdd, addLabel }: ListNavProps) => {
  return (
    <div className="w-full mb-4 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-4 w-full">
        {/* Search */}
        <div className="relative w-4/5 md:w-[300px]">
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

        

        
      </div>

      {/* ADD (desktop) */}
      <Button onClick={() => onAdd}>
        <Plus size={17} />
        <span className=" whitespace-nowrap">New</span>
      </Button>
    </div>
  );
};

export default ListNav;
