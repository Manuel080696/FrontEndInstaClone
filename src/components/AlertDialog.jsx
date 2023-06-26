import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ deleteService, id, text }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{text}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button
            onClick={() => {
              {
                id ? deleteService(id) : deleteService();
              }
            }}
            autoFocus
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
