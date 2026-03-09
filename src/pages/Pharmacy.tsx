import React, { useState } from "react";
import Container from "../components/ui/Container";
import { PHARMACY_TABS } from "../components/ui/tabs/Tabs";

const Pharmacy = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <Container>
      <div className=" bg-white rounded-sm w-full">
        {/* Tabs */}
        <div className="border-b border-t mb-4 flex gap-2 overflow-x-auto pt-1 px-1">
          {PHARMACY_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={` p-2 whitespace-nowrap text-sm font-medium ${
                activeTab === tab
                  ? " bg-black/5 text-green-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className=" px-3 pb-3 w-full">
          {activeTab === "Overview" && <div>Overview</div>}
          {activeTab === "Stock" && <div>Stock</div>}
          {activeTab === "Prescriptions" && <div>Prescriptions</div>}
          {activeTab === "Patients" && <div>Patients</div>}
          {activeTab === "Sales" && <div>Sales</div>}
          {activeTab === "Suppliers" && <div>Suppliers</div>}
        </div>
      </div>
    </Container>
  );
};

export default Pharmacy;
