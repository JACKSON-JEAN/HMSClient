import { ChevronLeft, Eye, PencilLine, Trash2 } from "lucide-react";
import React from "react";
import { Patient } from "./data/PatientsData";
import NavList from "./NavList";
import DeletePatient from "./DeletePatient";
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import AddPerson from "./AddPerson";
import AddPatient from "./AddPatient";

type FilterKey =
  | "patientID"
  | "fullName"
  | "age"
  | "gender"
  | "telephone"
  | "lastVist"
  | "status"
  | "diagnosis";

type PatientsComponentProps = {
  patients: Patient[];
  searchQuery: string;
};

const PatientsComponent = ({
  patients,
  searchQuery,
}: PatientsComponentProps) => {
  const [debouncedQuery, setDebouncedQuery] = React.useState("");
  type ColumnFilters = Partial<Record<FilterKey, string>> & {
    dateFrom?: string;
    dateTo?: string;
  };

  const [columnFilters, setColumnFilters] = React.useState<ColumnFilters>({});
  const [openFilter, setOpenFilter] = React.useState<FilterKey | null>(null);
  const [openAddPerson, setOpenAddPerson] = React.useState(false);
  const [openAddPatient, setOpenAddPatient] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [openDeletePatient, setOpenDeletePatient] = React.useState(false);
  const [selectedTitle, setSelectedTitle] = React.useState("");
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const filterRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const patientsData = React.useMemo(
    () =>
      patients.filter((p) => {
        const enrolledDate = p.lastVist ? new Date(p.lastVist) : null;
        const fromDate = columnFilters.dateFrom
          ? new Date(columnFilters.dateFrom)
          : null;
        const toDate = columnFilters.dateTo
          ? new Date(columnFilters.dateTo)
          : null;

        return (
          (!debouncedQuery ||
            Object.values(p).some((val) =>
              val
                ?.toString()
                .toLowerCase()
                .includes(debouncedQuery.toLowerCase()),
            )) &&
          (!columnFilters.status || p.status === columnFilters.status) &&
          (!columnFilters.gender || p.gender === columnFilters.gender) &&
          (!fromDate || (enrolledDate && enrolledDate >= fromDate)) &&
          (!toDate || (enrolledDate && enrolledDate <= toDate))
        );
      }),
    [patients, columnFilters, debouncedQuery],
  );

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

  const handleDelete = (id: number, title: string) => {
    setSelectedId(id);
    setSelectedTitle(title);
    setOpenDeletePatient(true);
  };

  return (
    <div className=" w-full">
      <NavList
        title="Patients"
        addLabel="New Patient"
        onAdd={() => setOpenAddPatient(true)}
        onOpen={() => setIsFiltersOpen(true)}
        dropdownActions={[
          {
            label: "Add Person",
            onClick: () => setOpenAddPerson(true),
          },
        ]}
      />

      {openDeletePatient && selectedId && (
        <DeletePatient
          id={selectedId}
          title={selectedTitle}
          onClose={() => {
            setOpenDeletePatient(false);
            setSelectedId(null);
          }}
        />
      )}

      {openAddPerson && <AddPerson onClose={() => setOpenAddPerson(false)} />}
      {openAddPatient && (
        <AddPatient onClose={() => setOpenAddPatient(false)} />
      )}

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
          <label htmlFor="gender" className=" text-sm">
            Gender
          </label>
          <select
            value={columnFilters.gender || ""}
            onChange={(e) =>
              setColumnFilters((prev) => ({
                ...prev,
                gender: e.target.value,
              }))
            }
            name="gender"
            id="gender"
            className=" w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-sm px-2 pr-2 py-1.5 outline-teal-600"
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
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
            <option value="Stable">Stable</option>
            <option value="Improving">Improving</option>
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

      <div className="w-full py-2 pl-2 bg-white overflow-x-auto overflow-auto border shadow-sm rounded-sm">
        <table className="min-w-[900px] w-full border-collapse">
          <thead className="bg-slate-100 sticky top-0 z-10">
            <tr className="border-b border-dashed border-gray-200">
              <th className="px-1 py-1 text-start">
                <input type="checkbox" />
              </th>
              <th className="px-3 py-1 text-start">
                <span className=" text-sm text-gray-500 whitespace-nowrap">
                  #
                </span>
                <div className=" w-5"></div>
              </th>
              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    patientID
                  </span>
                </div>
              </th>
              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    full Name
                  </span>
                </div>
              </th>
              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    Age
                  </span>
                </div>
              </th>
              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    Gender
                  </span>
                </div>
              </th>

              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    Phone
                  </span>
                </div>
              </th>
              <th className=" relative px-3 py-1 text-start">
                <div className=" flex items-center gap-3">
                  <span className=" text-sm text-gray-500 whitespace-nowrap">
                    Last Vist
                  </span>
                </div>
              </th>
              <th className=" px-3 py-1 text-start">
                <span className=" text-sm text-gray-500 whitespace-nowrap">
                  diagnosis
                </span>
              </th>
              <th className=" px-3 py-1 text-start">
                <span className=" text-sm text-gray-500 whitespace-nowrap">
                  Status
                </span>
              </th>

              {/* Sticky action header */}
              <th className="sticky right-0 bg-slate-100 px-3 py-1 text-sm text-gray-500 text-center whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>

          {patients.length >= 1 && (
            <tbody>
              {patientsData.map((patient, index) => {
                return (
                  <tr
                    key={index}
                    className={`border-b border-dashed border-gray-200}
                              `}
                  >
                    <td className="px-1 py-1 text-start">
                      <input type="checkbox" className="cursor-pointer" />
                    </td>
                    <td className="px-3 py-1 text-sm whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className=" px-3 py-1 text-sm whitespace-nowrap">
                      {highlightText(patient.patientID, debouncedQuery)}
                    </td>
                    <td className="px-3 py-1 text-sm whitespace-nowrap">
                      {highlightText(patient.fullName, debouncedQuery)}
                    </td>
                    <td className=" px-3 py-1 text-sm whitespace-nowrap">
                      {highlightText(patient.age, debouncedQuery)}
                    </td>
                    <td className="px-3 py-1 text-sm whitespace-nowrap">
                      {highlightText(patient.gender, debouncedQuery)}
                    </td>
                    <td className=" px-3 py-1 text-sm whitespace-nowrap">
                      {highlightText(patient.telephone, debouncedQuery)}
                    </td>
                    <td className=" px-3 py-1 text-sm whitespace-nowrap">
                      {highlightText(patient.lastVist, debouncedQuery)}
                    </td>
                    <td className="px-3 py-1 text-sm whitespace-nowrap">
                      {highlightText(patient.diagnosis, debouncedQuery)}
                    </td>
                    <td className="px-3 py-1 text-sm whitespace-nowrap">
                      {highlightText(patient.status, debouncedQuery)}
                    </td>

                    {/* Sticky action cell */}
                    <td
                      className={`sticky right-0 py-1 text-center whitespace-nowrap}
              `}
                    >
                      <span className=" h-full flex items-center justify-center gap-2 px-3 bg-white">
                        <Link
                          to={`/patients/${patient.id}`}
                          className=" p-0.5 rounded-sm shadow-md bg-blue-600 text-white hover:bg-blue-500"
                        >
                          <Eye size={15} />
                        </Link>
                        <button className=" p-0.5 rounded-sm shadow-md bg-green-600 text-white hover:bg-green-500">
                          <PencilLine size={15} />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(Number(patient.id), patient.fullName)
                          }
                          className=" p-0.5 rounded-sm shadow-md bg-red-600 text-white hover:bg-red-500"
                        >
                          <Trash2 size={15} />
                        </button>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default PatientsComponent;
