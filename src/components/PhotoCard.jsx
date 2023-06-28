import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import Alert from "@mui/material/Alert";

import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { deletePhotoService, likePhotoService } from "../services";
import { Link } from "react-router-dom";
import "./PhotoCard.css";
import AlertDialog from "./AlertDialog";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function PhotoCard({ photo, removePhoto }) {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(photo.dioLike);
  const [totalikes, setTotalikes] = useState(
    photo.numLikes ? photo.numLikes : 0
  );
  const [deletePhoto, setDeletePhoto] = useState(false);
  const srcImage = `${import.meta.env.VITE_APP_BACKEND}/uploads/posts/${
    photo.photoName
  }`;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const deletephoto = async (id) => {
    try {
      await deletePhotoService({ id, token });
      if (removePhoto) {
        removePhoto(id);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleLike = async () => {
    try {
      const data = await likePhotoService(token, photo.photoID);
      setLiked(data.vote);
      setTotalikes(data.likes);
    } catch (error) {
      if (error.message == "Token incorrecto") {
        return setError("Sesión expirada, vuelve a logearte por favor");
      }
      setError(error.message);
    }
  };

  const handleClick = async () => {
    navigate(`/comments/${photo.photoID}`);
  };

  return (
    <Card id="postCard">
      {/* Encabezado ----------------------*/}
      <CardHeader
        id="idPhoto"
        // Imagen rendonda con avatar
        avatar={
          <Link to={`/user/${photo.userID}`}>
            <Avatar id="avatarImage" className="avatarCard" aria-label="recipe">
              <img
                src={`${import.meta.env.VITE_APP_BACKEND}/uploads/avatar/${
                  photo.avatar
                }`}
                alt={photo.description}
              />
            </Avatar>
          </Link>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<p id="headerP">{photo.userPosted}</p>}
        subheader={photo.place}
      />
      {/* Final encabezado------------------------ */}

      {/* Contenido foto-------------------------- */}

      <CardMedia
        id="photo"
        component="img"
        image={srcImage}
        alt={photo.place}
        onClick={() => navigate(`/photos/${photo.photoID}`)}
        onDoubleClick={toggleLike}
      ></CardMedia>
      {/* Final contenido foto-------------------------- */}

      {/* Like, Basura, cometarios---------------------- */}
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={toggleLike}>
          {liked ? <FavoriteIcon sx={{ color: red[500] }} /> : <FavoriteIcon />}
        </IconButton>
        <p>{`${totalikes}`}</p>

        <IconButton aria-label="comment" onClick={handleClick}>
          <CommentIcon />
        </IconButton>

        <p>{photo.numComments}</p>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>

        {user.id === photo.userID ? (
          <IconButton
            aria-label="delete"
            onClick={() => setDeletePhoto(!deletePhoto)}
          >
            <DeleteIcon />
            {deletePhoto ? (
              <AlertDialog
                deleteService={deletephoto}
                id={photo.photoID}
                text={"¿Are you sure you want to delete the post?"}
                setState={setDeletePhoto}
              />
            ) : null}
          </IconButton>
        ) : null}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {!photo.date
              ? new Date().toLocaleDateString("es-ES")
              : new Date(photo.date).toLocaleDateString("es-ES")}
          </Typography>
          <Typography paragraph>{photo.description}</Typography>
        </CardContent>
      </Collapse>
      {error ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="warning" onClose={() => setError("")}>
            {error}
          </Alert>
        </Stack>
      ) : null}
    </Card>
  );
}
