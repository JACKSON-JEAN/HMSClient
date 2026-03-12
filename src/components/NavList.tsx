import { ChevronDown, Funnel, Plus } from "lucide-react";
import Button from "./ui/Button";
import React, { useState } from "react";

interface DropdownAction {
  label: string;
  onClick: () => void;
}

interface ListNavProps {
  onAdd: () => void;
  onOpen: () => void;
  addLabel: string;
  dropdownActions?: DropdownAction[];
  actions?: React.ReactNode;
  title?: string;
  subTitle?: string;
}

const NavList = ({
  onAdd,
  onOpen,
  addLabel,
  dropdownActions = [],
  actions,
  title,
}: ListNavProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full mb-2">
      <div className="relative flex justify-between">
        <div>
          <p className="text-gray-600 text-xl font-semibold capitalize">
            {title}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button className="md:hidden" onClick={onOpen}>
            <Funnel size={22} />
            <span className="hidden sm:block">Filters</span>
          </Button>

          {actions}

          {/* Split Button */}
          <div className="relative flex">
            <Button onClick={onAdd}>
              <Plus size={23} />
              <span className="hidden sm:block">{addLabel}</span>
            </Button>

            {dropdownActions.length > 0 && (
              <>
                <Button className=" border-l" onClick={() => setOpen(!open)}>
                  <ChevronDown size={23} />
                </Button>

                {open && (
                  <div className="absolute right-0 top-full mt-1 w-44 bg-white text-teal-600 border rounded-sm shadow-md z-50">
                    {dropdownActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          action.onClick();
                          setOpen(false);
                        }}
                        className="px-3 py-2 hover:bg-gray-100 w-full text-left"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavList;