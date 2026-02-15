export type Hospital = {
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
    code: "HOSP2534",
    name: "Holy Cross",
    type: "Faith-based",
    country: "Uganda",
    city: "Kampala",
    address: "Namungoona town",
    phone: "+256753792930",
    email: "hcross@gmail.com",
    license: "DIT54634",
    status: "Active",
    enrolledAt: "2023-10-19",
  },
];
