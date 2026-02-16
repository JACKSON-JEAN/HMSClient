// HospitalsDownload.tsx
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { ArrowDownToLine } from "lucide-react";

import { Hospital } from "./data/HospitalData";
import { ExportToExcel } from "../utils/ExportToExcel";

type Props = {
  data: Hospital[];
};

export default function HospitalsDownload({ data }: Props) {
  return (
    <PopupState variant="popover" popupId="export-menu">
      {(popupState) => (
        <>
          <Button
            variant="contained"
            {...bindTrigger(popupState)}
            disabled={data.length === 0}
          >
            <span className="mr-1">
              <ArrowDownToLine size={21} />
            </span>
            <span className="hidden sm:block">Export</span>
          </Button>

          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={() => {
                ExportToExcel(data);
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
