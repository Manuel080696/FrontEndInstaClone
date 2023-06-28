import * as React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/joy/Chip";
import ChipDelete from "@mui/joy/ChipDelete";
import { useState } from "react";
import AlertDialog from "./AlertDialog";

export const Comment = ({ comment, user, deleteComment }) => {
  const [delComment, setDelComment] = useState(false);
  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Link to={`/user/${user.id}`}>
              <Avatar
                alt={user.userName}
                src={`${import.meta.env.VITE_APP_BACKEND}/uploads/avatar/${
                  comment.avatar
                }`}
              />
            </Link>
          </ListItemAvatar>
          <ListItemText
            primary={new Date(comment.date).toLocaleDateString("es-ES")}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {comment.userName}
                </Typography>
                {` — ${comment.text}`}
              </React.Fragment>
            }
          />
          {comment.id_user === user.id ? (
            <Chip
              size="sm"
              variant="outlined"
              color="danger"
              endDecorator={
                <ChipDelete
                  onDelete={() => {
                    setDelComment(!delComment.comment);
                    // if (window.confirm("Are you sure?"))
                    //   deleteComment(comment.id);
                  }}
                />
              }
            >
              Delete
            </Chip>
          ) : null}
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      {delComment ? (
        <AlertDialog
          deleteService={deleteComment}
          id={comment.id}
          text={"¿Are you sure you want to delete the comment?"}
          setState={setDelComment}
        />
      ) : null}
    </>
  );
};
