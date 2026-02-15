import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { ArrowDownToLine } from 'lucide-react';

export default function HospitalsDownload() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            <span className=' mr-1'><ArrowDownToLine size={21} /></span>
            <span className=' hidden sm:block'>Export</span>
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Export as CSV</MenuItem>
            <MenuItem onClick={popupState.close}>Export as PDF</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}