import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { ArrowDownToLine } from "lucide-react";

import { Hospital } from "./data/HospitalData";
import { ExportToExcel } from "../utils/ExportToExcel";
import {
  HOSPITAL_EXPORT_COLUMNS,
  HospitalExportKey,
} from "../config/exportColumns";

type Props = {
  data: Hospital[];
};

export default function HospitalsDownload({ data }: Props) {
  const [selectedColumns, setSelectedColumns] = React.useState<
    HospitalExportKey[]
  >(HOSPITAL_EXPORT_COLUMNS.map((c) => c.key));

  const toggleColumn = (key: HospitalExportKey) => {
    setSelectedColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const toggleAll = () => {
    if (selectedColumns.length === HOSPITAL_EXPORT_COLUMNS.length) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns(HOSPITAL_EXPORT_COLUMNS.map((c) => c.key));
    }
  };

  return (
    <PopupState variant="popover" popupId="export-menu">
      {(popupState) => (
        <>
          <Button
            variant="contained"
            {...bindTrigger(popupState)}
            disabled={data.length === 0}
          >
            <ArrowDownToLine size={21} className="mr-1" />
            <span className="hidden sm:block">Export</span>
          </Button>

          <Menu {...bindMenu(popupState)} sx={{ p: 1 }}>
            <MenuItem disableRipple onClick={(e) => e.stopPropagation()}>
              <Checkbox
                checked={
                  selectedColumns.length === HOSPITAL_EXPORT_COLUMNS.length
                }
                onChange={toggleAll}
              />
              Select all columns
            </MenuItem>

            {HOSPITAL_EXPORT_COLUMNS.map((col) => (
              <MenuItem
                key={col.key}
                disableRipple
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={selectedColumns.includes(col.key)}
                  onChange={() => toggleColumn(col.key)}
                />
                {col.label}
              </MenuItem>
            ))}

            <MenuItem
              disabled={selectedColumns.length === 0}
              onClick={() => {
                ExportToExcel(data, selectedColumns);
                popupState.close();
              }}
            >
              Export as Excel
            </MenuItem>

            <MenuItem disabled>Export as PDF</MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
}
