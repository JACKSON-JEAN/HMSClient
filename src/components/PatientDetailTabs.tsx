import React, { useState } from "react";
import Button from "./ui/Button";

type Tab = "overview" | "notes" | "records" | "appointments" | "billing";

const PatientDetailTabs = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const notes = [
    {
      text: "Patient complains of persistent headache.",
      date: "22 Sep 2025",
      doctor: "Dr. Okello",
      files: [["Blood-test.pdf", "22kb"]],
    },
    {
      text: "Prescribed pain relief medication.",
      date: "22 Sep 2025",
      doctor: "Dr. Okello",
      files: [],
    },
    {
      text: "Follow-up advised after 2 weeks.",
      date: "22 Sep 2025",
      doctor: "Dr. Okello",
      files: [["Prescription.pdf", "18kb"]],
    },
  ];

  const visits = [
    {
      date: "22 Sep 2025",
      type: "OPD",
      doctor: "Dr. Okello",
      summary: "Headache",
    },
    {
      date: "15 Aug 2025",
      type: "OPD",
      doctor: "Dr. Akello",
      summary: "General Checkup",
    },
    {
      date: "15 Aug 2025",
      type: "OPD",
      doctor: "Dr. Akello",
      summary: "General Checkup",
    },
    {
      date: "15 Aug 2025",
      type: "OPD",
      doctor: "Dr. Akello",
      summary: "General Checkup",
    },
    {
      date: "15 Aug 2025",
      type: "OPD",
      doctor: "Dr. Akello",
      summary: "General Checkup",
    },
  ];

  // Insurance type
  interface Insurance {
    provider: string;
    policyNumber: string;
    validTill: Date;
  }

  // Payment type
  interface Payment {
    date: Date;
    amountPaid: number;
    amountPending: number;
    description: string;
  }

  // Example insurance
  const insurance: Insurance = {
    provider: "Jubilee Health",
    policyNumber: "JUB-2023-001",
    validTill: new Date("2026-12-31"),
  };

  // Example payments
  const payments: Payment[] = [
    {
      date: new Date("2026-01-15"),
      amountPaid: 50000,
      amountPending: 30000,
      description: "Consultation Fee",
    },
    {
      date: new Date("2026-02-10"),
      amountPaid: 20000,
      amountPending: 10000,
      description: "Lab Tests",
    },
    {
      date: new Date("2026-02-25"),
      amountPaid: 15000,
      amountPending: 0,
      description: "Medication",
    },
  ];

  // Calculate total paid and pending
  const totalPaid = payments.reduce((sum, p) => sum + p.amountPaid, 0);
  const totalPending = payments.reduce((sum, p) => sum + p.amountPending, 0);
  return (
    <div className="bg-white border rounded-sm shadow-sm">
      <div className="flex flex-wrap border-b text-sm">
        {[
          ["overview", "Overview"],
          ["records", "Visit History"],
          ["notes", "Notes & Files"],
          ["appointments", "Appointments"],
          ["billing", "Billing & Insurance"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as Tab)}
            className={`px-4 py-3 border-r last:border-r-0 ${
              activeTab === key
                ? "bg-green-50 text-green-700 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-4 space-y-6">
        {/* ================= OVERVIEW ================= */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-sm p-3 bg-slate-50 shadow-sm">
              <p className="text-sm font-semibold mb-2">Vitals</p>
              <div className="text-sm text-gray-700 space-y-1">
                <p>Height: 175 cm</p>
                <p>Weight: 76 kg</p>
                <p>BMI: 22.4</p>
                <p>BP: 124 / 80</p>
              </div>
            </div>

            <div className="border rounded-sm p-3 bg-slate-50 shadow-sm">
              <p className="text-sm font-semibold mb-2">Current Diagnosis</p>
              <p className="text-sm text-gray-700">
                Chronic headache with mild dizziness
              </p>
            </div>

            <div className="border rounded-sm p-3 bg-slate-50 shadow-sm">
              <p className="text-sm font-semibold mb-2">Latest Visit</p>
              <p className="text-sm text-gray-700">
                22 Sep 2025 • OPD • Dr. Okello
              </p>
            </div>
          </div>
        )}

        {/* ================= NOTES WITH FILES ================= */}
        {activeTab === "notes" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold">Clinical Notes</p>
              <Button>
                <span className=" text-sm">Add Note</span>
              </Button>
            </div>

            {notes.map((note, i) => (
              <div
                key={i}
                className="border rounded-sm p-3 bg-white shadow-sm space-y-3"
              >
                {/* Note text */}
                <p className="text-sm">{note.text}</p>

                {/* Files as inline tags */}
                {note.files.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {note.files.map(([name, size], idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-sm px-3 py-1 text-xs hover:bg-gray-200 cursor-pointer transition"
                      >
                        {/* File icon */}
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h10M7 11h10M7 15h6"
                          />
                        </svg>
                        <span className="font-medium">{name}</span>
                        <span className="text-gray-500">({size})</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Note footer */}
                <p className="text-xs text-gray-500">
                  {note.date} • {note.doctor}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ================= VISIT HISTORY / MEDICAL RECORDS ================= */}
        {activeTab === "records" && (
          <div className="space-y-6">
            <div className=" flex justify-between">
              <p className="text-sm font-semibold">Visit History</p>
              <Button>
                <span className=" text-sm">New Visit</span>
              </Button>
            </div>
            <div className="relative border-l border-gray-300 ml-3">
              {visits.map((visit, i) => (
                <div key={i} className="mb-6 relative pl-6">
                  {/* Circle aligned with this item */}
                  <span className="absolute -left-[7px] top-1 w-3 h-3 border-green-600 rounded-full border-2 bg-white"></span>

                  <p className="text-sm font-medium">{visit.summary}</p>
                  <p className="text-xs text-gray-500">
                    {visit.date} • {visit.type} • {visit.doctor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= APPOINTMENTS ================= */}
        {activeTab === "appointments" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left border-b">Date</th>
                  <th className="px-3 py-2 text-left border-b">Department</th>
                  <th className="px-3 py-2 text-left border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2">05 Oct 2025</td>
                  <td className="px-3 py-2">OPD</td>
                  <td className="px-3 py-2">Scheduled</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* ================= BILLING ================= */}
        {activeTab === "billing" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* -------- PAYMENTS CARD -------- */}
            <div className="border rounded-sm p-3 bg-slate-50 shadow-sm flex flex-col">
              <div className=" flex justify-between mb-2">
                <p className="text-sm font-semibold mb-3">Payments</p>
                {/* Add new payment */}
                <div className="">
                  <Button><span className=" text-sm">Add Payment</span></Button>
                </div>
              </div>

              {/* Payments list */}
              <div className="flex-1 space-y-2 max-h-64 overflow-y-auto">
                {payments.length > 0 ? (
                  payments.map((payment, i) => {
                    const hasPending = payment.amountPending > 0;

                    return (
                      <div
                        key={i}
                        className="bg-white p-3 rounded-sm border shadow-sm flex justify-between items-start gap-4"
                      >
                        {/* Left */}
                        <div className="text-sm text-gray-700 space-y-1">
                          <p className="font-medium">
                            {payment.date.toLocaleDateString()}
                          </p>
                          <p className="italic text-gray-500">
                            {payment.description}
                          </p>

                          {/* Status */}
                          {hasPending ? (
                            <span className="inline-block text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                              Partially Paid
                            </span>
                          ) : (
                            <span className="inline-block text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                              Fully Paid
                            </span>
                          )}
                        </div>

                        {/* Right */}
                        <div className="text-sm text-gray-700 text-right space-y-1">
                          <p>
                            Paid:{" "}
                            <span className="font-medium">
                              UGX {payment.amountPaid.toLocaleString()}
                            </span>
                          </p>

                          <p
                            className={
                              hasPending ? "text-red-600 font-medium" : ""
                            }
                          >
                            Pending: UGX{" "}
                            {payment.amountPending.toLocaleString()}
                          </p>

                          {/* Actions */}
                          <div className="mt-2 flex justify-end gap-2">
                            <button
                              className="text-xs text-blue-600 hover:underline"
                              onClick={() => console.log("edited")}
                            >
                              Edit
                            </button>

                            {hasPending && (
                              <button
                                className="text-xs text-green-600 hover:underline"
                                onClick={() => console.log("settled")}
                              >
                                Settle
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500">No payments recorded</p>
                )}
              </div>

              {/* Payments summary */}
              {payments.length > 0 && (
                <div className="mt-4 text-sm text-gray-800 font-semibold border-t pt-2">
                  Total Paid: UGX {totalPaid.toLocaleString()} • Total Pending:
                  UGX {totalPending.toLocaleString()}
                </div>
              )}
            </div>

            {/* -------- INSURANCE CARD -------- */}
            <div>
              <div className="border rounded-sm p-3 bg-slate-50 shadow-sm flex flex-col justify-between">
                <div>
                  <p className="text-sm font-semibold mb-2">Insurance</p>
                  {insurance ? (
                    <>
                      <p className="text-sm text-gray-700">
                        {insurance.provider}
                      </p>
                      <p className="text-sm text-gray-700">
                        Policy #: {insurance.policyNumber}
                      </p>
                      <p className="text-sm text-gray-700">
                        Valid till: {insurance.validTill.toLocaleDateString()}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">No insurance added</p>
                  )}
                </div>
                <div className=" mt-4">
                  <Button>
                    <span className=" text-sm">{insurance ? "Edit Insurance" : "Add Insurance"}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetailTabs;
