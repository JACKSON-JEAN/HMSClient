import React, { useState } from "react";
import Delete from "./Delete";
import SuccessSnackbar from "./SuccessSnackBar";

interface DeleteHospitalProps {
  onClose: () => void;
  title: string;
  id: number;
}

const DeleteHospital: React.FC<DeleteHospitalProps> = ({
  onClose,
  title,
  id,
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const deleteHandler = () => {
    console.log(`Deleted hospital with id ${id}`);

    // show success notification
    setOpenSnackbar(true);
  };

  return (
    <>
      <Delete title={title} onClose={onClose} onConfirm={deleteHandler} />

      <SuccessSnackbar
        open={openSnackbar}
        message={`Hospital deleted successfully`}
        onClose={() => setOpenSnackbar(false)}
      />
    </>
  );
};

export default DeleteHospital;
