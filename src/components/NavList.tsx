import { Funnel, Plus } from "lucide-react";
import Button from "./ui/Button";
import React from "react";

interface ListNavProps {
  onAdd: () => void;
  onOpen: () => void;
  addLabel: string;
  actions?: React.ReactNode;
  title?: string;
  subTitle?: string;
}

const NavList = ({
  onAdd,
  onOpen,
  addLabel,
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
          <Button onClick={onAdd}>
            <Plus size={23} />
            <span className=" hidden sm:block">{addLabel}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavList;
