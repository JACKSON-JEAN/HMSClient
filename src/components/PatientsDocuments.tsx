import React from "react";

const PatientsDocuments = () => {
  return (
    <div className="bg-white border rounded-sm p-3 h-48 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium">Medical Files</p>
        <button className="text-sm text-blue-600">Upload</button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 text-sm">
        {[
          "Blood Test Results.pdf",
          "X-Ray Chest.png",
          "Prescription Sept 2025.pdf",
        ].map((file, i) => (
          <div
            key={i}
            className="flex justify-between items-center border rounded-sm px-2 py-1 hover:bg-gray-50 cursor-pointer"
          >
            <p>{file}</p>
            <p className="text-xs text-gray-500">24kb</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsDocuments;
