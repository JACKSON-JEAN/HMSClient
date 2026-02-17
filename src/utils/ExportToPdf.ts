import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Hospital } from "../components/data/HospitalData";
import {
  HOSPITAL_EXPORT_COLUMNS,
  HospitalExportKey,
} from "../config/exportColumns";

export const ExportToPdf = (
  data: Hospital[],
  selectedColumns: HospitalExportKey[],
) => {
  const doc = new jsPDF({
    orientation: "landscape", // hospitals tables are wide
  });

  // Build headers
  const headers = selectedColumns.map((key) => {
    const column = HOSPITAL_EXPORT_COLUMNS.find((c) => c.key === key);
    return column?.label ?? key;
  });

  // Build rows
  const rows = data.map((row) =>
    selectedColumns.map((key) => String(row[key] ?? "")),
  );

  doc.text("Hospitals Report", 14, 15);

  autoTable(doc, {
    startY: 20,
    head: [headers],
    body: rows,
    styles: {
      fontSize: 9,
    },
    headStyles: {
      fillColor: [41, 128, 185], // blue header
    },
  });

  doc.save("hospitals.pdf");
};
