import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Hospital } from "../components/data/HospitalData";

export const ExportToExcel = (data: Hospital[]) => {
  const formatted = data.map((h, index) => ({
    Code: h.code,
    Name: h.name,
    Type: h.type,
    Country: h.country,
    City: h.city,
    Address: h.address,
    Phone: h.phone,
    Email: h.email,
    "License No": h.license,
    Status: h.status,
    "Date Enrolled": h.enrolledAt,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formatted);
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

