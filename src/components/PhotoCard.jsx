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
import { grey, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentIcon from "@mui/icons-material/Comment";
import Alert from "@mui/material/Alert";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { deletePhotoService, likePhotoService } from "../services";
import { Link } from "react-router-dom";
import "./PhotoCard.css";
import AlertDialog from "./AlertDialog";
import MenuAppBar from "./MenuAppBar";
import CustomizedSnackbars from "./CustomizedSnackbars";
import usePhotosServices from "../hooks/usePhotosServices";
import { ModalContext } from "../context/ModalContext";

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
  const { user, token } = useContext(AuthContext);
  const { showEdit, setShowEdit } = useContext(ModalContext);
  const [error, setError] = useState("");
  const [showFavorite, setShowFavorite] = useState(true);
  const [removeFavorite, setRemoveFavorite] = useState(false);
  const [totalikes, setTotaLikes] = useState(
    photo.numLikes ? photo.numLikes : 0
  );
  const [like, setLike] = useState(photo.dioLike);
  const [deletePhoto, setDeletePhoto] = useState(false);
  const [addFavorite, setAddFavorite] = useState(false);
  const [editPhoto, setEditPhoto] = useState("");

  const { addToFavorites, removeFromFavorites } = usePhotosServices();
  const navigate = useNavigate();
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

  async function toggleLike() {
    try {
      const data = await likePhotoService(token, photo.photoID);

      setLike(data.vote);
      setTotaLikes(data.likes);

      photo.dioLike = data.vote;
      photo.numLikes = data.likes;
    } catch (error) {
      setError(error.message);
    }
  }

  const handleClick = async () => {
    try {
      if (token) {
        navigate(`/comments/${photo.photoID}`);
      } else {
        setError("You must login or register for comment");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFavorite = () => {
    if (token) {
      setShowFavorite(!showFavorite);
      if (showFavorite) {
        addToFavorites(photo);
        setAddFavorite(true);
      } else {
        removeFromFavorites(photo);
        setRemoveFavorite(true);
      }
    } else {
      setError("You must login or register for favorites");
    }
  };

  return (
    <Card id="postCard" photo={photo}>
      {/* Encabezado ----------------------*/}
      <CardHeader
        id="idPhoto"
        // Imagen rendonda con avatar

        avatar={
          photo.avatar ? (
            <Link to={`/user/${photo.userID}`}>
              <Avatar
                id="avatarImage"
                className="avatarCard"
                aria-label="recipe"
              >
                <img
                  src={`${import.meta.env.VITE_APP_BACKEND}/uploads/avatar/${
                    photo.avatar
                  }`}
                  alt={photo.userPosted}
                />
              </Avatar>
            </Link>
          ) : (
            <Link to={`/user/${photo.userID}`}>
              <Avatar
                id="avatarImage"
                className="avatarCard"
                aria-label="recipe"
              >
                <img src="/avatarDefault.png" alt={photo.userPosted} />
              </Avatar>
            </Link>
          )
        }
        action={
          <section onClick={() => setEditPhoto(photo)}>
            <MenuAppBar
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              photo={editPhoto}
            />
          </section>
        }
        title={<p id="headerP">{photo.userPosted}</p>}
        subheader={photo.place}
      />
      {/* Edit post -------------------- */}

      {/* Final encabezado------------------------ */}

      {/* Contenido foto-------------------------- */}

      <section id="carMedia">
        <CardMedia
          id="cardMediaPhoto"
          component="img"
          image={srcImage}
          alt={photo.place}
          photo={photo}
          onClick={() => navigate(`/photos/${photo.photoID}`)}
          onDoubleClick={toggleLike}
        ></CardMedia>

        {like ? (
          <object
            id="animated-object"
            type="image/svg+xml"
            data="/likeAnimated.svg"
          />
        ) : null}
      </section>
      {/* Final contenido foto-------------------------- */}

      {/* Like, Basura, cometarios---------------------- */}
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={toggleLike}>
          <FavoriteIcon
            sx={like ? { color: red[500] } : { color: grey[600] }}
          />
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
        <section aria-label="bookmark">
          <BookmarkIcon sx={{ color: grey[600] }} onClick={handleFavorite} />

          {addFavorite && (
            <CustomizedSnackbars
              message={"Post added to favorites"}
              severity={"success"}
              setAddFavorite={setAddFavorite}
            />
          )}
          {removeFavorite && (
            <CustomizedSnackbars
              message={"Post delete from favorites"}
              severity={"error"}
              setRemoveFavorite={setRemoveFavorite}
            />
          )}
        </section>
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
