import React, { useEffect, useState } from 'react'
import Container from '../components/ui/Container'
import { CircleX, EllipsisVertical, Pencil } from 'lucide-react';
import ListNav from '../components/ListNav';

type MenuState = {
  row: number;
  x: number;
  y: number;
} | null;

const Hospitals = () => {
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
        <ListNav
          searchPlaceholder='Search Hospital...'
          addLabel='New Hospital'
          onAdd={() => console.log("Hospital added")}
        />

        {/* Scroll container */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-[900px] w-full border-collapse">
            <thead className="bg-slate-100 sticky top-0 z-10">
              <tr className='border-b border-dashed border-gray-200'>
                <th className="px-3 py-1 text-sm text-gray-500 text-start whitespace-nowrap">
                  #
                </th>
                <th className=" hidden sm:table-cell px-3 py-1 text-sm text-gray-500 text-start whitespace-nowrap">
                  Code
                </th>
                <th className="px-3 py-1 text-sm text-gray-500 text-start whitespace-nowrap">
                  Hospital Name
                </th>
                <th className=" hidden sm:table-cell px-3 py-1 text-sm text-gray-500 text-start whitespace-nowrap">
                  Type
                </th>
                <th className=" hidden sm:table-cell px-3 py-1 text-sm text-gray-500 text-start whitespace-nowrap">
                  Level
                </th>
                <th className="px-3 py-1 text-sm text-gray-500 text-start whitespace-nowrap">
                  Country
                </th>
                <th className=" px-3 py-1 text-sm text-gray-500 text-start whitespace-nowrap">
                  City
                </th>
                <th className=" px-3 py-1 text-sm text-gray-500 text-start whitespace-nowrap">
                  Address
                </th>
                <th className=" px-3 py-1 text-sm text-gray-500 text-start whitespace-nowrap">
                  Phone
                </th>
                <th className=" px-3 py-1 text-sm text-gray-500 text-start whitespace-nowrap">
                  Email
                </th>
                <th className=" hidden sm:table-cell px-3 py-1 text-sm text-gray-500 text-start whitespace-nowrap">
                  License Number
                </th>
                <th className="px-3 py-1 text-sm text-gray-500 text-start whitespace-nowrap">
                  Status
                </th>
                <th className=" hidden sm:table-cell px-3 py-1 text-sm text-gray-500 text-start whitespace-nowrap">
                  Date Enrolled
                </th>

                {/* Sticky action header */}
                <th className="sticky right-0 bg-slate-100 px-3 py-1 text-sm text-gray-500 text-center whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {[0, 1].map((row, index) => (
                <tr
                  key={row}
                  className="border-b border-dashed border-gray-200 even:bg-gray-50"
                >
                  <td className="px-3 py-1 text-sm whitespace-nowrap">{index + 1}</td>
                  <td className=" hidden sm:table-cell px-3 py-1 text-sm whitespace-nowrap">HOSP2534</td>
                  <td className="px-3 py-1 text-sm whitespace-nowrap">Holy Cross</td>
                  <td className=" hidden sm:table-cell px-3 py-1 text-sm whitespace-nowrap">Faith-based</td>
                  <td className=" hidden sm:table-cell px-3 py-1 text-sm whitespace-nowrap">District</td>
                  <td className="px-3 py-1 text-sm whitespace-nowrap">Uganda</td>
                  <td className=" px-3 py-1 text-sm whitespace-nowrap">
                    Kampala
                  </td>
                  <td className=" px-3 py-1 text-sm whitespace-nowrap">
                    Namungoona town
                  </td>
                  <td className="px-3 py-1 text-sm whitespace-nowrap">+256753792930</td>
                  <td className="px-3 py-1 text-sm whitespace-nowrap">hcross@gmail.com</td>
                  <td className=" hidden sm:table-cell px-3 py-1 text-sm whitespace-nowrap">DIT54634</td>
                  <td className="px-3 py-1 text-sm whitespace-nowrap">Active</td>
                  <td className=" hidden sm:table-cell px-3 py-1 text-sm whitespace-nowrap">19.Oct.2023</td>

                  {/* Sticky action cell */}
                  <td className="sticky right-0 bg-white px-3 py-1 text-center whitespace-nowrap">
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
          <button
            className="w-full flex items-center gap-1 text-left px-3 py-2 border-b text-green-600 hover:bg-gray-100"
            onClick={() => setMenu(null)}
          >
            <Pencil size={16}/> <span>Edit Hospital</span> 
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
  )
}

export default Hospitals