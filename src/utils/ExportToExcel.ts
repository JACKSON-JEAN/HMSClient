import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Hospital } from "../components/data/HospitalData";

export const exportToExcel = (data: Hospital[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Hospitals");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, "hospitals.xlsx");
};
