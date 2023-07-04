import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { IconButton } from "@mui/joy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ModalEditPost } from "./ModalEditPost";
import { useState } from "react";
export default function MenuAppBar({ showEdit, setShowEdit, photo }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [, setShowEditPost] = useState(false);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="edit post"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        sx={{ flexGrow: 1 }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => setShowEdit(true)}>Edit</MenuItem>
        {showEdit && (
          <ModalEditPost photo={photo} setShowEditPost={setShowEditPost} />
        )}
      </Menu>
    </div>
  );
}
