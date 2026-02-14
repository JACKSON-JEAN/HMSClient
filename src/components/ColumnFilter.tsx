import { Funnel } from "lucide-react";
import React from "react";

type ColumnFilterProps = {
  id: string;
  label: string;
  openFilter: string | null;
  toggle: (key: string) => void;
  children: React.ReactNode;
};

export default function ColumnFilter({
  id,
  label,
  openFilter,
  toggle,
  children,
}: ColumnFilterProps) {
  const isOpen = openFilter === id;

  return (
    <th className="relative hidden sm:table-cell px-3 py-1 text-start">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500 whitespace-nowrap">
          {label}
        </span>

        <span
          onClick={() => toggle(id)}
          className={`cursor-pointer ${
            isOpen ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <Funnel size={13} />
        </span>
      </div>

      {/* Popover */}
      {isOpen && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="bg-white border shadow-md rounded-sm absolute top-7 z-20"
        >
          {children}
        </div>
      )}
    </th>
  );
}
