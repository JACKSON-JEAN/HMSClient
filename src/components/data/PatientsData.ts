export type Patient = {
  id: number;
  patientID: string;
  fullName: string;
  age: string;
  gender: "Male" | "Female";
  telephone: string;
  lastVist: string;
  diagnosis: string;
  status: "Stable" | "Improving" | "Stable";
};

export const patients: Patient[] = [
  {
    id: 1,
    patientID: "PAT96328",
    fullName: "John Doe",
    age: "23",
    telephone: "+256776286453",
    lastVist: "2024-08-17",
    gender: "Male",
    diagnosis: "Headache",
    status: "Stable",
  },
  {
    id: 2,
    patientID: "PAT06343",
    fullName: "Jane Doe",
    age: "23",
    telephone: "+256776735664",
    lastVist: " 2025-10-26",
    gender: "Female",
    diagnosis: "Stomachache",
    status: "Improving",
  },
  {
    id: 3,
    patientID: "PAT8376",
    fullName: "Uwizeye Jackson",
    age: "23",
    telephone: "+2567423936",
    lastVist: " 2025-10-26",
    gender: "Male",
    diagnosis: "Cough",
    status: "Stable",
  },
];
