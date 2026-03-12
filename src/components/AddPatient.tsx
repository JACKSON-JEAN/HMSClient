import React, { useState } from "react";
import CustomTextField, { CustomAutocomplete } from "./ui/CustomTextField";
import { MenuItem } from "@mui/material";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Patient, patients } from "./data/PatientsData";

const AddPatient = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    country: "",
    city: "",
    address: "",
    phone: "",
    email: "",
    license: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return createPortal(
    <div
      className=" fixed inset-0 z-30 flex justify-center items-start pt-12 bg-black/30"
      onClick={onClose}
    >
      <form
        onSubmit={submitHandler}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[420px] rounded-md shadow-lg"
      >
        {/* Header */}
        <div className=" relative flex items-center bg-teal-600 px-4 py-3 rounded-t-md">
          <p className="text-lg font-semibold text-white">Add Patient</p>
          <button
            type="button"
            onClick={onClose}
            className=" absolute right-3 bg-black/10 p-0.5 rounded-sm text-white hover:text-gray-200"
          >
            <X size={19} />
          </button>
        </div>

        {/* Fields */}
        <div className=" p-4 space-y-4">
          <CustomAutocomplete<Patient>
            label="Search Patient"
            options={patients}
            freeSolo
            optionLabel={(p) => p.fullName}
            optionDescription={(p) =>
              `${p.patientID} • ${p.gender} • ${p.age} yrs • ${p.telephone}`
            }
            filterOptions={(options, state) => {
              const tokens = state.inputValue
                .toLowerCase()
                .split(/\s+/)
                .filter(Boolean);

              return options.filter((p) => {
                if (typeof p === "string") {
                  return tokens.every((t) => p.toLowerCase().includes(t));
                }

                const fullName = p.fullName.toLowerCase();
                const patientID = p.patientID.toLowerCase();
                const phone = p.telephone;

                const nameParts = fullName.split(" ");
                const initials = nameParts.map((n) => n[0]).join("");

                const searchable = `${fullName} ${patientID} ${phone}`;

                return tokens.every(
                  (t) =>
                    searchable.includes(t) || // normal search
                    initials.includes(t), // initials search
                );
              });
            }}
          />

          <div className="grid grid-cols-2 gap-2">
            <CustomTextField
              type="date"
              label="Date of Birth"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <CustomTextField
              select
              label="Gender"
              name="gender"
              value={form.type}
              onChange={handleChange}
              sx={{
                "& .MuiSelect-select": {
                  padding: "8px 10px",
                  fontSize: "14px",
                },
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </CustomTextField>
          </div>
          <CustomTextField
            label="Mobile Phone"
            name="phone"
            value={form.city}
            onChange={handleChange}
          />

          <CustomTextField
            label="Address"
            name="address"
            value={form.country}
            onChange={handleChange}
          />

          <div className=" flex gap-2 items-center">
            <p className=" whitespace-nowrap text-sm text-teal-600">
              Next of kin
            </p>
            <div className=" h-[1px] w-full bg-slate-300"></div>
          </div>

          <CustomTextField
            label="Full Name"
            name="NOKName"
            value={form.address}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-2">
            <CustomTextField
              select
              label="Relationship"
              name="relationship"
              value={form.type}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-input": {
                  padding: "8px 10px",
                  fontSize: "14px",
                },
              }}
            >
              <MenuItem value="Father">Father</MenuItem>
              <MenuItem value="Mother">Mother</MenuItem>
              <MenuItem value="Wife">Wife</MenuItem>
              <MenuItem value="Husband">Husband</MenuItem>
              <MenuItem value="Sister">Sister</MenuItem>
              <MenuItem value="Brother">Brother</MenuItem>
              <MenuItem value="Aunt">Aunt</MenuItem>
              <MenuItem value="Uncle">Uncle</MenuItem>
              <MenuItem value="Child">Child</MenuItem>
              <MenuItem value="Guardian">Guardian</MenuItem>
              <MenuItem value="Relative">Relative</MenuItem>
              <MenuItem value="Friend">Friend</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </CustomTextField>
            <CustomTextField
              label="Mobile Phone"
              name="NOKphone"
              value={form.license}
              onChange={handleChange}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-medium text-sm border rounded-sm text-teal-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-medium text-sm bg-teal-600 hover:bg-teal-700 text-white rounded-sm "
            >
              Add Patient
            </button>
          </div>
        </div>
      </form>
    </div>,
    document.body,
  );
};

export default AddPatient;
