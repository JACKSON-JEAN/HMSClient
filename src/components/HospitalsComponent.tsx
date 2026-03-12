import { ChevronLeft, CircleX, PencilLine, Trash2 } from "lucide-react";
import * as React from "react";
import { Hospital } from "./data/HospitalData";
import NavList from "./NavList";
import HospitalsDownload from "./HospitalsDownload";
import Button from "./ui/Button";
import AddHospital from "./AddHospital";
import EditHospital from "./EditHospital";
import DeleteHospital from "./DeleteHospital";

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

type HospitalComponentProps = {
  hospitals: Hospital[];
  searchQuery: string;
};

export default function HospitalComponent({
  hospitals,
  searchQuery,
}: HospitalComponentProps) {
  const [menu, setMenu] = React.useState<MenuState>(null);
  const [openFilter, setOpenFilter] = React.useState<FilterKey | null>(null);
  const filterRef = React.useRef<HTMLDivElement | null>(null);
  type ColumnFilters = Partial<Record<FilterKey, string>> & {
    dateFrom?: string;
    dateTo?: string;
  };
  const [columnFilters, setColumnFilters] = React.useState<ColumnFilters>({});
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const [openAddHospital, setOpenAddHospital] = React.useState(false);
  const [openEditHospital, setOpenEditHospital] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [openDeleteHospital, setOpenDeleteHospital] = React.useState(false);
  const [selectedTitle, setSelectedTitle] = React.useState("");

  const [debouncedQuery, setDebouncedQuery] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  const hospitalData = React.useMemo(
    () =>
      hospitals.filter((h) => {
        const enrolledDate = h.enrolledAt ? new Date(h.enrolledAt) : null;
        const fromDate = columnFilters.dateFrom
          ? new Date(columnFilters.dateFrom)
          : null;
        const toDate = columnFilters.dateTo
          ? new Date(columnFilters.dateTo)
          : null;
        return (
          (!debouncedQuery ||
            Object.values(h).some((val) =>
              val
                ?.toString()
                .toLowerCase()
                .includes(debouncedQuery.toLowerCase()),
            )) &&
          (!columnFilters.code ||
            h.code?.toLowerCase().includes(columnFilters.code.toLowerCase())) &&
          (!columnFilters.name ||
            h.name?.toLowerCase().includes(columnFilters.name.toLowerCase())) &&
          (!columnFilters.type || h.type === columnFilters.type) &&
          (!columnFilters.country ||
            h.country
              ?.toLowerCase()
              .includes(columnFilters.country.toLowerCase())) &&
          (!columnFilters.city ||
            h.city?.toLowerCase().includes(columnFilters.city.toLowerCase())) &&
          (!columnFilters.license ||
            h.license
              ?.toLowerCase()
              .includes(columnFilters.license.toLowerCase())) &&
          (!columnFilters.status || h.status === columnFilters.status) &&
          (!fromDate || (enrolledDate && enrolledDate >= fromDate)) &&
          (!toDate || (enrolledDate && enrolledDate <= toDate))
        );
      }),
    [hospitals, columnFilters, debouncedQuery],
  );

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === hospitalData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(hospitalData.map((h) => h.id)));
    }
  };

  const exportData = React.useMemo(() => {
    return hospitalData.filter((h) => selectedIds.has(h.id));
  }, [hospitalData, selectedIds]);

  const handleSelectEdit = (id: number) => {
    setOpenEditHospital(true);
    setSelectedId(id);
  };

  const handleDelete = (id: number, title: string) => {
    setSelectedId(id);
    setSelectedTitle(title);
    setOpenDeleteHospital(true);
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 px-0.5 rounded font-medium">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className=" w-full">
      {/* Hospital */}
      <NavList
        onAdd={() => setOpenAddHospital(true)}
        onOpen={() => setIsFiltersOpen(true)}
        addLabel="New Hospital"
        actions={<HospitalsDownload data={exportData} />}
        title="Hospitals"
        subTitle="Manage all registered hospitals."
      />

      <div className="flex flex-wrap gap-2 mb-2">
        {Object.entries(columnFilters).map(([key, value]) =>
          value ? (
            <div
              key={key}
              className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-sm"
            >
              <span>
                {key}: {value}
              </span>
              <button
                onClick={() =>
                  setColumnFilters((prev) => ({ ...prev, [key]: "" }))
                }
                className="cursor-pointer"
              >
                <CircleX size={12} />
              </button>
            </div>
          ) : null,
        )}

        {Object.values(columnFilters).some((v) => v) && (
          <button
            onClick={() => setColumnFilters({})}
            className="text-sm text-red-600 hover:underline ml-2"
          >
            Clear All
          </button>
        )}
      </div>

      {isFiltersOpen && (
        <div
          className=" w-full h-screen fixed inset-0 z-30 bg-black/15 md:hidden"
          onClick={() => setIsFiltersOpen(false)}
        />
      )}

      <div
        className={`
    z-40 bg-white
    md:bg-transparent
    md:relative md:z-0
    md:flex md:flex-wrap md:gap-2
    md:p-0 md:shadow-none
    md:mb-3

    ${isFiltersOpen ? "fixed left-1/2 top-16 -translate-x-1/2 p-3 shadow rounded-md w-[300px]" : "hidden"}
    md:block
  `}
      >
        <div className=" md:hidden flex justify-between items-center mb-3">
          <button
            onClick={() => setIsFiltersOpen(false)}
            className=" cursor-pointer rounded-full bg-black/5 border hover:bg-black/10"
          >
            <ChevronLeft size={18} />
          </button>
          <p className=" font-semibold">Filters</p>
          <button
            onClick={() => setIsFiltersOpen(false)}
            className=" font-semibold text-blue-600 hover:text-blue-500"
          >
            Done
          </button>
        </div>
        <div className=" w-full md:w-auto mb-3 md:mb-0 flex flex-col">
          <label htmlFor="type" className=" text-sm">
            Type
          </label>
          <select
            value={columnFilters.type || ""}
            onChange={(e) =>
              setColumnFilters((prev) => ({
                ...prev,
                type: e.target.value,
              }))
            }
            name="type"
            id="type"
            className=" w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-sm px-2 pr-2 py-1.5 outline-teal-600"
          >
            <option value="">All</option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
            <option value="Faith-based">Faith based</option>
          </select>
        </div>
        <div className=" w-full md:w-auto mb-3 md:mb-0 flex flex-col">
          <label htmlFor="status" className=" text-sm">
            Status
          </label>
          <select
            value={columnFilters.status || ""}
            onChange={(e) =>
              setColumnFilters((prev) => ({
                ...prev,
                status: e.target.value,
              }))
            }
            name="status"
            id="status"
            className=" w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-sm px-2 pr-2 py-1.5 outline-teal-600"
          >
            <option value="" className="py-1.5">
              All
            </option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
        <div className=" w-full md:w-auto mb-3 md:mb-0 flex flex-col">
          <label htmlFor="from" className=" text-sm">
            Date From
          </label>
          <input
            id="from"
            name="from"
            type="date"
            value={columnFilters.dateFrom || ""}
            onChange={(e) => {
              setColumnFilters((prev) => {
                const next = { ...prev, dateFrom: e.target.value };

                // If "To" is earlier than new "From", clear it
                if (next.dateTo && next.dateTo < next.dateFrom) {
                  next.dateTo = "";
                }

                return next;
              });
            }}
            placeholder="From"
            className=" w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-sm px-2 py-[5px] outline-teal-600"
          />
        </div>
        <div className=" w-full md:w-auto mb-3 md:mb-0 flex flex-col">
          <label htmlFor="to" className=" text-sm">
            Date To
          </label>
          <input
            id="to"
            name="to"
            type="date"
            value={columnFilters.dateTo || ""}
            min={columnFilters.dateFrom || undefined}
            onChange={(e) => {
              setColumnFilters((prev) => {
                const next = { ...prev, dateTo: e.target.value };
                if (next.dateFrom && next.dateTo) setOpenFilter(null);
                return next;
              });
            }}
            placeholder="To"
            className=" w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-sm px-2 py-[5px] outline-teal-600"
          />
        </div>
        <div className=" flex items-end mb-3 md:mb-0">
          <Button
            onClick={() => setColumnFilters({})}
            className=" w-full md:w-auto flex justify-center"
          >
            Clear Filters
          </Button>
        </div>
        <div className=" md:hidden flex items-end">
          <Button className=" w-full md:w-auto flex justify-center !bg-white !text-teal-600 border shadow-sm hover:!bg-black/5">
            Apply Filters
          </Button>
        </div>
      </div>

      {openAddHospital && (
        <AddHospital onClose={() => setOpenAddHospital(false)} />
      )}
      {openEditHospital && selectedId && (
        <EditHospital
          hospitalId={selectedId}
          onClose={() => {
            setOpenEditHospital(false);
            setSelectedId(null);
            setMenu(null);
          }}
        />
      )}

      {openDeleteHospital && selectedId && (
        <DeleteHospital
          id={selectedId}
          title={selectedTitle}
          onClose={() => {
            setOpenDeleteHospital(false);
            setSelectedId(null);
          }}
        />
      )}

      <div className="w-full py-2 pl-2 bg-white overflow-x-auto overflow-auto border shadow-sm rounded-sm">
        <table className="min-w-[900px] w-full border-collapse">
          <thead className="bg-slate-100 sticky top-0 z-10">
            <tr className="border-b border-dashed border-gray-200">
              <th className="px-1 py-1 text-start">
                <input
                  type="checkbox"
                  checked={
                    hospitalData.length > 0 &&
                    selectedIds.size === hospitalData.length
                  }
                  onChange={toggleAll}
                />
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
                </div>
              </th>
              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    Hospital Name
                  </span>
                </div>
              </th>
              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    Type
                  </span>
                </div>
              </th>

              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    Country
                  </span>
                </div>
              </th>
              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    City
                  </span>
                </div>
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
                </div>
              </th>
              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    Status
                  </span>
                </div>
              </th>

              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    Date Enrolled
                  </span>
                </div>
              </th>

              {/* Sticky action header */}
              <th className="sticky right-0 bg-slate-100 px-3 py-1 text-sm text-gray-500 text-center whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>

          {hospitalData.length >= 1 && (
            <tbody>
              {hospitalData.map((hospital, index) => {
                const isSelected = selectedIds.has(hospital.id);
                const isEven = index % 2 === 1;
                const isHighlighted = isSelected || menu?.row === index;
                return (
                  <tr
                    key={index}
                    className={`border-b border-dashed border-gray-200 ${isHighlighted ? "bg-blue-50" : isEven ? "bg-gray-50" : ""}
                  `}
                  >
                    <td className="px-1 py-1 text-start">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(hospital.id)}
                        onChange={() => toggleRow(hospital.id)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="px-3 py-1 text-sm whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className=" px-3 py-1 text-sm whitespace-nowrap">
                      {highlightText(hospital.code, debouncedQuery)}
                    </td>
                    <td className="px-3 py-1 text-sm whitespace-nowrap">
                      {highlightText(hospital.name, debouncedQuery)}
                    </td>
                    <td className=" px-3 py-1 text-sm whitespace-nowrap">
                      {highlightText(hospital.type, debouncedQuery)}
                    </td>
                    <td className="px-3 py-1 text-sm whitespace-nowrap">
                      {highlightText(hospital.country, debouncedQuery)}
                    </td>
                    <td className=" px-3 py-1 text-sm whitespace-nowrap">
                      {highlightText(hospital.city, debouncedQuery)}
                    </td>
                    <td className=" px-3 py-1 text-sm whitespace-nowrap">
                      {highlightText(hospital.address, debouncedQuery)}
                    </td>
                    <td className="px-3 py-1 text-sm whitespace-nowrap">
                      {highlightText(hospital.phone, debouncedQuery)}
                    </td>
                    <td className="px-3 py-1 text-sm whitespace-nowrap">
                      {highlightText(hospital.email, debouncedQuery)}
                    </td>
                    <td className=" px-3 py-1 text-sm whitespace-nowrap">
                      {highlightText(hospital.license, debouncedQuery)}
                    </td>
                    <td className={`px-3 py-1 whitespace-nowrap`}>
                      <span
                        className={`text-xs font-medium border rounded-full px-2 py-0.5 ${hospital.status === "Active" ? "text-green-600 bg-green-100 border-green-500 " : hospital.status === "Inactive" ? "text-black bg-gray-200 border-black" : "text-red-700 bg-red-100 border-red-600"}`}
                      >
                        {highlightText(hospital.status, debouncedQuery)}
                      </span>
                    </td>
                    <td className=" px-3 py-1 text-sm whitespace-nowrap">
                      {hospital.enrolledAt}
                    </td>

                    {/* Sticky action cell */}
                    <td
                      className={`sticky right-0 px-3 py-1 text-center whitespace-nowrap ${isHighlighted ? "bg-blue-50" : isEven ? "bg-gray-50" : " bg-white"}
  `}
                    >
                      <span className=" h-full flex items-center jus gap-2">
                        <button
                          onClick={() =>
                            handleDelete(Number(hospital.id), hospital.name)
                          }
                          className=" p-0.5 rounded-sm shadow-md bg-red-600 text-white hover:bg-red-500"
                        >
                          <Trash2 size={15} />
                        </button>
                        <button
                          onClick={(e) => handleSelectEdit(Number(hospital.id))}
                          className=" p-0.5 rounded-sm shadow-md bg-green-600 text-white hover:bg-green-500"
                        >
                          <PencilLine size={15} />
                        </button>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {hospitals.length >= 1 && hospitalData.length < 1 && (
          <div className=" w-full text-center py-8 text-gray-700">
            <p className=" text-lg font-semibold">No data found!</p>
            <p>Please adjust your filter.</p>
          </div>
        )}
        {hospitals.length < 1 && (
          <div className=" w-full text-center py-8 text-gray-700">
            <p className=" text-lg font-semibold">Empty hospitals!</p>
            <p>Please add a hospital.</p>
          </div>
        )}
      </div>
    </div>
  );
}
