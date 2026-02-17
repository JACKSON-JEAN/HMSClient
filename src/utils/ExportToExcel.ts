// utils/ExportToExcel.ts
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Hospital } from "../components/data/HospitalData";
import { HOSPITAL_EXPORT_COLUMNS, HospitalExportKey } from "../config/exportColumns";
// import { HOSPITAL_EXPORT_COLUMNS, HospitalExportKey } from "../components/exportColumns";

export const ExportToExcel = (
  data: Hospital[],
  selectedColumns: HospitalExportKey[],
) => {
  const formatted = data.map((row) => {
    const obj: Record<string, any> = {};

    selectedColumns.forEach((key) => {
      const column = HOSPITAL_EXPORT_COLUMNS.find((c) => c.key === key);
      if (column) {
        obj[column.label] = row[key];
      }
    });

    return obj;
  });

  const worksheet = XLSX.utils.json_to_sheet(formatted);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Hospitals");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  saveAs(
    new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    "hospitals.xlsx",
  );
};
