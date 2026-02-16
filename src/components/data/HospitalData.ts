export type Hospital = {
  id: string;
  code: string;
  name: string;
  type: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  license: string;
  status: string;
  enrolledAt: string;
};

export const hospitals: Hospital[] = [
  {
    id: "1",
    code: "HOSP2534",
    name: "Holy Cross",
    type: "Private",
    country: "Uganda",
    city: "Kampala",
    address: "Namungoona town",
    phone: "+256753792930",
    email: "hcross@gmail.com",
    license: "DIT54634",
    status: "Active",
    enrolledAt: "2023-10-19",
  },
  {
    id: "2",
    code: "HOSP6342",
    name: "Orthodox",
    type: "Faith-based",
    country: "Uganda",
    city: "Kampala",
    address: "Nansana",
    phone: "+256776286453",
    email: "orthodox@gmail.com",
    license: "DIT5662",
    status: "Suspended",
    enrolledAt: "2024-08-23",
  },
  {
    id: "3",
    code: "HOSP9272",
    name: "King Faisal",
    type: "Public",
    country: "Rwanda",
    city: "Kigali",
    address: "Masaka",
    phone: "+2507883538325",
    email: "kfaisal@gmail.com",
    license: "DIT73538",
    status: "Inactive",
    enrolledAt: "2025-03-28",
  },
];
