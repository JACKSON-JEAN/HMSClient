import {
  TextField,
  TextFieldProps,
  Autocomplete,
  AutocompleteProps,
} from "@mui/material";

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
          "& .MuiSelect-select.MuiSelect-outlined": {
            padding: "9px 10px",
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

// Autocomplete
type CustomAutocompleteProps<T> = Omit<
  AutocompleteProps<T | string, false, false, true>,
  "renderInput" | "getOptionLabel" | "renderOption"
> & {
  label?: string;
  optionLabel: (option: T) => string;
  optionDescription?: (option: T) => string;
};

export function CustomAutocomplete<T>({
  label,
  optionLabel,
  optionDescription,
  ...props
}: CustomAutocompleteProps<T>) {
  return (
    <Autocomplete
      {...props}
      sx={{
        "& .MuiAutocomplete-option": {
          padding: "11px 12px",
        },
      }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : optionLabel(option)
      }
      renderOption={(propsLi, option) => {
        if (typeof option === "string") {
          return <li {...propsLi}>{option}</li>;
        }

        return (
          <li {...propsLi}>
            <div className="flex flex-col">
              <span className="font-medium">{optionLabel(option)}</span>
              {optionDescription && (
                <span className="text-xs text-gray-500">
                  {optionDescription(option)}
                </span>
              )}
            </div>
          </li>
        );
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          label={label}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: 0, // removes extra wrapper padding
            },
            // "& .MuiOutlinedInput-input": {
            //   padding: "8px 10px",
            //   fontSize: "14px",
            // },
          }}
        />
      )}
    />
  );
}
