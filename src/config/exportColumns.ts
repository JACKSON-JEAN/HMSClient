// exportColumns.ts
export const HOSPITAL_EXPORT_COLUMNS = [
  { key: "code", label: "Code" },
  { key: "name", label: "Hospital Name" },
  { key: "type", label: "Type" },
  { key: "country", label: "Country" },
  { key: "city", label: "City" },
  { key: "address", label: "Address" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "license", label: "License No" },
  { key: "status", label: "Status" },
  { key: "enrolledAt", label: "Date Enrolled" },
] as const;

export type HospitalExportKey =
  typeof HOSPITAL_EXPORT_COLUMNS[number]["key"];
