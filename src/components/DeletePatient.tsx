import React, { useState } from "react";
import Delete from "./Delete";
import SuccessSnackbar from "./SuccessSnackBar";

interface DeletePatientProps {
  onClose: () => void;
  title: string;
  id: number;
}

const DeletePatient: React.FC<DeletePatientProps> = ({
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

export default DeletePatient;
