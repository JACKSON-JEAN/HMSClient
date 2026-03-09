import { TextField, TextFieldProps } from "@mui/material";

type CustomTextFieldProps = TextFieldProps;

const CustomTextField = (props: CustomTextFieldProps) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      {...props}
      sx={{
        "& .MuiInputLabel-root": {
          color: "#64748b",
          fontSize: "16px",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#0f766e",
        },
        "& .MuiOutlinedInput-root": {
          "& .MuiOutlinedInput-input": {
            padding: "11px 10px",
            fontSize: "14px",
          },
          "& fieldset": {
            borderColor: "#cbd5e1",
          },
          "&:hover fieldset": {
            borderColor: "#0d9488",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#0d9488",
          },
        },

        // allow consumer override
        ...props.sx,
      }}
    />
  );
};

export default CustomTextField;