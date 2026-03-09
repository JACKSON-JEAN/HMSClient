import { MenuItem, TextFieldProps } from "@mui/material";
import CustomTextField from "./CustomTextField";

type CustomSelectFieldProps = Omit<TextFieldProps, "select" | "children"> & {
  options: { label: string; value: string }[];
};

const CustomSelectField = ({
  options,
  label,
  ...props
}: CustomSelectFieldProps) => {
  return (
    <CustomTextField select label={label} {...props}>
      <MenuItem value="">
        <em>Select {label}</em>
      </MenuItem>

      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </CustomTextField>
  );
};

export default CustomSelectField;