import React, { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import PatientsNav from "../components/PatientsNav";
import { CircleX, EllipsisVertical, Eye, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

type MenuState = {
  row: number;
  x: number;
  y: number;
} | null;

const Patients = () => {
  const [menu, setMenu] = useState<MenuState>(null);

  const openMenu = (
    row: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();

    setMenu({
      row,
      x: rect.right,
      y: rect.bottom,
    });
  };

  // Close menu on outside click
  useEffect(() => {
    const closeMenu = () => setMenu(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  return (
    <Container>
      <div className="w-full bg-white p-2 border rounded-sm">
        <PatientsNav />

        {/* Scroll container */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-[900px] w-full border-collapse">
            <thead className="bg-slate-100 sticky top-0 z-10">
              <tr className=" border-b border-dashed border-gray-200">
                <th className="px-3 py-1 text-sm text-gray-500 text-start">
                  Patient ID
                </th>
                <th className="px-3 py-1 text-sm text-gray-500 text-start">
                  Name
                </th>
                <th className="px-3 py-1 text-sm text-gray-500 text-start">
                  Age
                </th>
                <th className="px-3 py-1 text-sm text-gray-500 text-start">
                  Telephone
                </th>
                <th className="px-3 py-1 text-sm text-gray-500 text-start">
                  Last visit
                </th>
                <th className="hidden md:table-cell px-3 py-1 text-sm text-gray-500 text-start">
                  Gender
                </th>
                <th className="hidden md:table-cell px-3 py-1 text-sm text-gray-500 text-start">
                  Diagnosis
                </th>
                <th className="px-3 py-1 text-sm text-gray-500 text-start">
                  Status
                </th>

                {/* Sticky action header */}
                <th className="sticky right-0 bg-slate-100 px-3 py-1 text-sm text-gray-500 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {[0, 1].map((row) => (
                <tr
                  key={row}
                  className="border-b border-dashed border-gray-200 even:bg-gray-50"
                >
                  <td className="px-3 py-1 text-sm">P-2534</td>
                  <td className="px-3 py-1 text-sm">John Doe</td>
                  <td className="px-3 py-1 text-sm">26</td>
                  <td className="px-3 py-1 text-sm">+26575379293</td>
                  <td className="px-3 py-1 text-sm">12-Jan-2026</td>
                  <td className="hidden md:table-cell px-3 py-1 text-sm">
                    Male
                  </td>
                  <td className="hidden md:table-cell px-3 py-1 text-sm">
                    Headache
                  </td>
                  <td className="px-3 py-1 text-sm">Stable</td>

                  {/* Sticky action cell */}
                  <td className="sticky right-0 bg-white px-3 py-1 text-center">
                    <button
                      onClick={(e) => openMenu(row, e)}
                      className="text-gray-600 hover:text-black"
                    >
                      <EllipsisVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FLOATING DROPDOWN (OUTSIDE TABLE) */}
      {menu && (
        <div
          style={{
            position: "fixed",
            top: menu.y - 65,
            right: 60,
          }}
          className="z-[9999] w-36 bg-white border rounded-sm shadow-lg text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            to={`/patients/${123}`}
            className="w-full flex items-center gap-1 text-left px-3 py-2 border-b text-blue-600 hover:bg-gray-100"
            onClick={() => setMenu(null)}
          >
            <Eye size={16}/> <span>View profile</span>
          </Link>
          <button
            className="w-full flex items-center gap-1 text-left px-3 py-2 border-b text-green-600 hover:bg-gray-100"
            onClick={() => setMenu(null)}
          >
            <Pencil size={16}/> <span>Edit patient</span> 
          </button>
          <button
            className="w-full flex items-center gap-1 text-left px-3 py-2 text-red-600 hover:bg-red-50"
            onClick={() => setMenu(null)}
          >
            <CircleX size={16}/> <span>Delete</span> 
          </button>
        </div>
      )}
    </Container>
  );
};

export default Patients;
