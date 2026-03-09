import React from "react";

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

function DataTable<T>({ columns, data }: DataTableProps<T>) {
  return (
    <table className="min-w-[900px] w-full border-collapse">
      <thead className="bg-slate-100 sticky top-0 z-10">
        <tr className="border-b border-dashed border-gray-200">
          {columns.map((col, i) => (
            <th key={i} className={`px-3 py-1 text-start ${col.className}`}>
              <span className=" text-sm text-gray-500 whitespace-nowrap">
                {col.header}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => {
          const isEven = index % 2 === 1;
          return (
            <tr
              key={index}
              className={`border-b border-dashed border-gray-200 ${
                isEven ? "bg-gray-50" : ""
              }`}
            >
              {columns.map((col, i) => (
                <td key={i} className={`px-3 py-1 text-sm ${col.className}`}>
                  {col.render
                    ? col.render(row, index)
                    : String(row[col.accessor as keyof T])}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DataTable;
