import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

export default function AlertDialog({
  deleteService,
  id,
  text,
  setState,
  setIsMenuOpen,
}) {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setState(false);
    setOpen(false);
  };
  const buttonYes = (id) => {
    id ? deleteService(id) : deleteService();
    setState(false);
    setIsMenuOpen ? setIsMenuOpen(false) : null;
    navigate("/");
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
                buttonYes(id);
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
