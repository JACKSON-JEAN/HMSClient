import React from "react";
import Button from "./ui/Button";
import { MapPin, Mars, Phone, UserRoundPlus } from "lucide-react";

const PatientHeader = () => {
  return (
    <div className="bg-white border rounded-sm p-3 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="w-20 h-20 bg-gray-100 border rounded-full" />
            <div>
              <p className="text-xl font-semibold">John Doe</p>
              <p className="text-sm text-gray-500 flex gap-1 items-center">
                <Mars size={16} /> <span>Male • 26 yrs</span>
              </p>
              <div className="mt-1 text-sm text-gray-600 space-y-0.5">
                <p className=" flex gap-1 items-center">
                  <Phone size={16} /> <span>+256 776 286 453</span>
                </p>
                <p className=" flex gap-1 items-center">
                  <MapPin size={16} /> <span>Nansana, Wakiso</span>
                </p>
                <p className=" flex gap-1 items-center">
                  <UserRoundPlus size={16} />{" "}
                  <span>N.O.K: Jane Doe • +256 701 223 344</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button><span>Schedule</span></Button>
          </div>
        </div>
  );
};

export default PatientHeader;
