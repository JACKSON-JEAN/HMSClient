import React from "react";

const PatientVitals = () => {
  return (
    <div className="bg-white border rounded-sm p-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
      <div>
        <p className="text-gray-500">Blood Pressure</p>
        <p className="font-medium text-gray-800">124 / 80</p>
      </div>

      <div>
        <p className="text-gray-500">Weight</p>
        <p className="font-medium text-gray-800">76 kg</p>
      </div>

      <div>
        <p className="text-gray-500">Height</p>
        <p className="font-medium text-gray-800">175 cm</p>
      </div>

      <div>
        <p className="text-gray-500">BMI</p>
        <p className="font-medium text-gray-800">22.4</p>
      </div>
    </div>
  );
};

export default PatientVitals;
