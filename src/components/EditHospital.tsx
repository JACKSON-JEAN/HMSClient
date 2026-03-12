import React, { useState } from "react";
import CustomTextField from "./ui/CustomTextField";
import { MenuItem } from "@mui/material";
import { createPortal } from "react-dom";

interface EditHospitalProps {
    onClose: () => void,
    hospitalId: number,
}

const EditHospital: React.FC<EditHospitalProps> = ({ onClose, hospitalId }) => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    status: "",
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
    onClose()
    console.log(form);
  };

  return createPortal (
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
        <div className="flex justify-between items-center mb-3 bg-teal-600 px-4 py-3 rounded-t-md">
          <p className="text-lg font-semibold text-white">Edit Hospital {hospitalId ?? hospitalId}</p>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Fields */}
        <div className=" p-4 space-y-4">
          <CustomTextField
            label="Hospital Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-2">
            <CustomTextField
              select
              label="Hospital Type"
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Public">Public</MenuItem>
              <MenuItem value="Private">Private</MenuItem>
              <MenuItem value="Faith-based">Faith-based</MenuItem>
            </CustomTextField>

            <CustomTextField
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Suspended">Suspended</MenuItem>
            </CustomTextField>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CustomTextField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            <CustomTextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CustomTextField
              label="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
            />
            <CustomTextField
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <CustomTextField
            label="Physical Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
          <CustomTextField
            label="License Number"
            name="license"
            value={form.license}
            onChange={handleChange}
          />
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
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default EditHospital;
