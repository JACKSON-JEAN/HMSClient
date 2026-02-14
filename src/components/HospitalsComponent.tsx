import { CircleX, EllipsisVertical, Funnel, Pencil } from "lucide-react";
import * as React from "react";

type MenuState = {
  row: number;
  x: number;
  y: number;
} | null;

type FilterKey =
  | "code"
  | "name"
  | "type"
  | "country"
  | "city"
  | "license"
  | "status"
  | "date";

export default function HospitalComponent() {
  const [menu, setMenu] = React.useState<MenuState>(null);
  const [openFilter, setOpenFilter] = React.useState<FilterKey | null>(null);
  const filterRef = React.useRef<HTMLDivElement | null>(null);

  const openMenu = (row: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();

    setMenu({
      row,
      x: rect.right,
      y: rect.bottom,
    });
  };

  // Close menu on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!openFilter) return;

      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpenFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openFilter]);

  //Toggle filter
  const toggleFilter = (key: FilterKey) => {
    setOpenFilter((prev) => (prev === key ? null : key));
  };

  React.useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenFilter(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // Close menu on outside click
  React.useEffect(() => {
    const closeMenu = () => setMenu(null);
    window.addEventListener("mousedown", closeMenu);
    return () => window.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="min-w-[900px] w-full border-collapse">
          <thead className="bg-slate-100 sticky top-0 z-10">
            <tr className="border-b border-dashed border-gray-200">
              <th className="px-1 py-1 text-start">
                <input type="checkbox" className=" cursor-pointer"/>
              </th>
              <th className="px-3 py-1 text-start">
                <span className=" text-sm text-gray-500 whitespace-nowrap">
                  #
                </span>
                <div className=" w-5">
                  {/* <p>.</p>
                    <input type="text" className=' w-[100%] border rounded outline-blue-600 text-sm text-gray-600 p-0.5 font-normal'/> */}
                </div>
              </th>
              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    Code
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFilter("code");
                    }}
                    className={` cursor-pointer hover:text-blue-600 ${openFilter === "code" ? " text-blue-600" : "text-gray-500"}`}
                  >
                    <Funnel size={13} fontWeight="bold" />
                  </span>
                </div>
                {openFilter === "code" && (
                  <div
                    ref={filterRef}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                    }}
                    className=" bg-white border shadow-md rounded-sm p-2 absolute top-7 z-10"
                  >
                    <input
                      type="text"
                      className={`border rounded-sm outline-blue-600 text-sm text-gray-600 p-1 font-normal`}
                      placeholder="Search code..."
                    />
                  </div>
                )}
              </th>
              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    Hospital Name
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFilter("name");
                    }}
                    className={` cursor-pointer hover:text-blue-600 ${openFilter === "name" ? " text-blue-600" : "text-gray-500"}`}
                  >
                    <Funnel size={13} fontWeight="bold" />
                  </span>
                </div>
                {openFilter === "name" && (
                  <div
                    ref={filterRef}
                    onMouseDown={(e) => e.stopPropagation()}
                    className=" bg-white border shadow-md rounded-sm p-2 absolute top-7 z-10"
                  >
                    <input
                      type="text"
                      className=" border rounded-sm outline-blue-600 text-sm text-gray-600 p-1 font-normal"
                      placeholder="Search name..."
                    />
                  </div>
                )}
              </th>
              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    Type
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFilter("type");
                    }}
                    className={` cursor-pointer hover:text-blue-600 ${openFilter === "type" ? " text-blue-600" : "text-gray-500"}`}
                  >
                    <Funnel size={13} fontWeight="bold" />
                  </span>
                </div>
                {openFilter === "type" && (
                  <div
                    ref={filterRef}
                    onMouseDown={(e) => e.stopPropagation()}
                    className=" bg-white border shadow-md rounded-sm absolute top-7 z-10"
                  >
                    <ul>
                      <li className=" font-normal whitespace-nowrap px-3 py-1 cursor-pointer border-b hover:bg-black/5">
                        Faith based
                      </li>
                      <li className=" font-normal whitespace-nowrap px-3 py-1 cursor-pointer border-b hover:bg-black/5">
                        Public
                      </li>
                      <li className=" font-normal whitespace-nowrap px-3 py-1 cursor-pointer border-b hover:bg-black/5">
                        Private
                      </li>
                    </ul>
                  </div>
                )}
              </th>

              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    Country
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFilter("country");
                    }}
                    className={` cursor-pointer hover:text-blue-600 ${openFilter === "country" ? " text-blue-600" : "text-gray-500"}`}
                  >
                    <Funnel size={13} fontWeight="bold" />
                  </span>
                </div>
                {openFilter === "country" && (
                  <div
                    ref={filterRef}
                    onMouseDown={(e) => e.stopPropagation()}
                    className=" bg-white border shadow-md rounded-sm p-2 absolute top-7 z-10"
                  >
                    <input
                      type="text"
                      className=" border rounded-sm outline-blue-600 text-sm text-gray-600 p-1 font-normal"
                      placeholder="Search country..."
                    />
                  </div>
                )}
              </th>
              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    City
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFilter("city");
                    }}
                    className={` cursor-pointer hover:text-blue-600 ${openFilter === "city" ? " text-blue-600" : "text-gray-500"}`}
                  >
                    <Funnel size={13} fontWeight="bold" />
                  </span>
                </div>
                {openFilter === "city" && (
                  <div
                    ref={filterRef}
                    onMouseDown={(e) => e.stopPropagation()}
                    className=" bg-white border shadow-md rounded-sm p-2 absolute top-7 z-10"
                  >
                    <input
                      type="text"
                      className=" border rounded-sm outline-blue-600 text-sm text-gray-600 p-1 font-normal"
                      placeholder="Search city..."
                    />
                  </div>
                )}
              </th>
              <th className=" px-3 py-1 text-start">
                <span className=" text-sm text-gray-500 whitespace-nowrap">
                  Address
                </span>
              </th>
              <th className=" px-3 py-1 text-start">
                <span className=" text-sm text-gray-500 whitespace-nowrap">
                  Phone
                </span>
              </th>
              <th className=" px-3 py-1 text-start">
                <span className=" text-sm text-gray-500 whitespace-nowrap">
                  Email
                </span>
              </th>

              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    License No
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFilter("license");
                    }}
                    className={` cursor-pointer hover:text-blue-600 ${openFilter === "license" ? " text-blue-600" : "text-gray-500"}`}
                  >
                    <Funnel size={13} fontWeight="bold" />
                  </span>
                </div>
                {openFilter === "license" && (
                  <div
                    ref={filterRef}
                    onMouseDown={(e) => e.stopPropagation()}
                    className=" bg-white border shadow-md rounded-sm p-2 absolute top-7 z-10"
                  >
                    <input
                      type="text"
                      className=" border rounded-sm outline-blue-600 text-sm text-gray-600 p-1 font-normal"
                      placeholder="Search license..."
                    />
                  </div>
                )}
              </th>
              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    Status
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFilter("status");
                    }}
                    className={` cursor-pointer hover:text-blue-600 ${openFilter === "status" ? " text-blue-600" : "text-gray-500"}`}
                  >
                    <Funnel size={13} fontWeight="bold" />
                  </span>
                </div>
                {openFilter === "status" && (
                  <div
                    ref={filterRef}
                    onMouseDown={(e) => e.stopPropagation()}
                    className=" bg-white border shadow-md rounded-sm absolute top-7 z-10"
                  >
                    <ul>
                      <li className=" font-normal whitespace-nowrap px-3 py-1 cursor-pointer border-b hover:bg-black/5">
                        All
                      </li>
                      <li className=" font-normal whitespace-nowrap px-3 py-1 cursor-pointer border-b hover:bg-black/5">
                        Active
                      </li>
                      <li className=" font-normal whitespace-nowrap px-3 py-1 cursor-pointer border-b hover:bg-black/5">
                        Inactive
                      </li>
                      <li className=" font-normal whitespace-nowrap px-3 py-1 cursor-pointer border-b hover:bg-black/5">
                        Suspended
                      </li>
                    </ul>
                  </div>
                )}
              </th>

              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    Date Enrolled
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFilter("date");
                    }}
                    className={` cursor-pointer hover:text-blue-600 ${openFilter === "date" ? " text-blue-600" : "text-gray-500"}`}
                  >
                    <Funnel size={13} fontWeight="bold" />
                  </span>
                </div>
                {openFilter === "date" && (
                  <div
                    ref={filterRef}
                    onMouseDown={(e) => e.stopPropagation()}
                    className=" bg-white border shadow-md rounded-sm px-2 py-1 absolute top-7 z-10"
                  >
                    <label htmlFor="from" className="font-normal">
                      From:
                    </label>
                    <input
                      id="from"
                      type="date"
                      className=" border rounded-sm outline-blue-600 text-sm text-gray-600 p-1 font-normal"
                    />
                    <label htmlFor="to" className="font-normal">
                      To:
                    </label>
                    <input
                      id="to"
                      type="date"
                      className=" border rounded-sm outline-blue-600 text-sm text-gray-600 p-1 font-normal"
                    />
                  </div>
                )}
              </th>

              {/* Sticky action header */}
              <th className="sticky right-0 bg-slate-100 px-3 py-1 text-sm text-gray-500 text-center whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (row, index) => (
                <tr
                  key={row}
                  className={`border-b border-dashed border-gray-200 ${menu?.row === row ? "bg-blue-100" : " even:bg-gray-50"}`}
                >
                  <td className="px-1 py-1 text-start">
                    <input type="checkbox" className=" cursor-pointer"/>
                  </td>
                  <td className="px-3 py-1 text-sm whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className=" px-3 py-1 text-sm whitespace-nowrap">
                    HOSP2534
                  </td>
                  <td className="px-3 py-1 text-sm whitespace-nowrap">
                    Holy Cross
                  </td>
                  <td className=" px-3 py-1 text-sm whitespace-nowrap">
                    Faith-based
                  </td>
                  <td className="px-3 py-1 text-sm whitespace-nowrap">
                    Uganda
                  </td>
                  <td className=" px-3 py-1 text-sm whitespace-nowrap">
                    Kampala
                  </td>
                  <td className=" px-3 py-1 text-sm whitespace-nowrap">
                    Namungoona town
                  </td>
                  <td className="px-3 py-1 text-sm whitespace-nowrap">
                    +256753792930
                  </td>
                  <td className="px-3 py-1 text-sm whitespace-nowrap">
                    hcross@gmail.com
                  </td>
                  <td className=" px-3 py-1 text-sm whitespace-nowrap">
                    DIT54634
                  </td>
                  <td className="px-3 py-1 text-sm whitespace-nowrap">
                    Active
                  </td>
                  <td className=" px-3 py-1 text-sm whitespace-nowrap">
                    19.Oct.2023
                  </td>

                  {/* Sticky action cell */}
                  <td
                    className={`sticky right-0 px-3 py-1 text-center whitespace-nowrap
    ${menu?.row === row ? "bg-blue-100" : "bg-white"}
  `}
                  >
                    <button
                      onClick={(e) => openMenu(row, e)}
                      className="text-gray-600 hover:text-black"
                    >
                      <EllipsisVertical size={16} />
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>

      {/* FLOATING DROPDOWN (OUTSIDE TABLE) */}
      {menu && (
        <div
          style={{
            position: "fixed",
            top: menu.y - 65,
            right: 50,
          }}
          className="z-[9999] w-36 bg-white border rounded-sm shadow-lg text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="w-full flex items-center gap-1 text-left px-3 py-2 border-b text-green-600 hover:bg-green-50"
            onClick={() => setMenu(null)}
          >
            <Pencil size={16} /> <span>Edit Hospital</span>
          </button>
          <button
            className="w-full flex items-center gap-1 text-left px-3 py-2 text-red-600 hover:bg-red-50"
            onClick={() => setMenu(null)}
          >
            <CircleX size={16} /> <span>Delete</span>
          </button>
        </div>
      )}
    </>
  );
}
