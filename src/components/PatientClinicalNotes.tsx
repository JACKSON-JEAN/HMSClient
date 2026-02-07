import React from "react";

const PatientClinicalNotes = () => {
  return (
    <div className="bg-white border rounded-sm p-3 h-48 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium">Clinical Notes</p>
        <button className="text-sm text-blue-600">Add Note</button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 text-sm">
        <div className="border rounded-sm p-2">
          <p className="text-xs text-gray-500 mb-1">Sept 22, 2025</p>
          <p>Patient reports persistent headache and dizziness for 3 days.</p>
        </div>

        <div className="border rounded-sm p-2">
          <p className="text-xs text-gray-500 mb-1">Sept 20, 2025</p>
          <p>No known drug allergies. Appetite normal.</p>
        </div>
      </div>
    </div>
  );
};

export default PatientClinicalNotes;
