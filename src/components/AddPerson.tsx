import React, { useState } from "react";
import CustomTextField from "./ui/CustomTextField";
import { MenuItem } from "@mui/material";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const AddPerson = ({ onClose }: { onClose: () => void }) => {
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
      className=" fixed inset-0 z-30 flex justify-center items-start pt-14 bg-black/30"
      onClick={onClose}
    >
      <form
        onSubmit={submitHandler}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[420px] rounded-md shadow-lg"
      >
        {/* Header */}
        <div className=" relative flex items-center bg-teal-600 px-4 py-3 rounded-t-md">
          <p className="text-lg font-semibold text-white capitalize">
            Register new person
          </p>
          <button
            type="button"
            onClick={onClose}
            className=" absolute right-3 bg-black/10 p-0.5 rounded-sm text-white hover:text-gray-200"
          >
            <X size={19} />
          </button>
        </div>

        {/* Fields */}
        <div className=" flex">
          <div className=" p-3 flex-1 space-y-4">
            <CustomTextField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <CustomTextField
              select
              label="Gender"
              name="type"
              value={form.type}
              onChange={handleChange}
              sx={{
                "& .MuiSelect-select": {
                  padding: "8px 10px",
                  fontSize: "14px",
                },
              }}
            >
              <MenuItem value="Public">Male</MenuItem>
              <MenuItem value="Private">Female</MenuItem>
            </CustomTextField>

            <CustomTextField
              type="date"
              label="Date of Birth"
              name="address"
              value={form.address}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <CustomTextField
              label="Mobile Phone"
              name="license"
              value={form.license}
              onChange={handleChange}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="submit"
                className="px-4 py-2 text-sm shadow-md bg-teal-600 hover:bg-teal-700 text-white rounded-sm "
              >
                Register Person
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>,
    document.body,
  );
};

export default AddPerson;
