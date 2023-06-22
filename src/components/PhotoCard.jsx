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
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { deletePhotoService, likePhotoService } from "../services";
import { Link } from "react-router-dom";

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
  const [totalikes, setTotalikes] = useState(photo.numLikes);
  const srcImage = `${import.meta.env.VITE_APP_BACKEND}/uploads/posts/${
    photo.photoName
  }`;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
<<<<<<< HEAD
  const deletephoto = async (id) => {
    try {
      await deletePhotoService({ id, token });
      if (removePhoto) {
        removePhoto(id);
      } else {
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
      alert(error.message);
    }
  };

  const handleClick = async () => {
    navigate(`/comments/${photo.photoID}`);
  };
=======
>>>>>>> 9c34ce69386fafb09f693678cbbcf0a83719000c

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Link to={`/user/${user.id}`}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              <img
                src={`${import.meta.env.VITE_APP_BACKEND}/uploads/avatar/${
                  photo.avatar
                }`}
                alt=""
              />
            </Avatar>
          </Link>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={photo.userPosted}
        subheader={photo.place}
      />
      <CardMedia
        component="img"
        height="194"
        image={srcImage}
        alt={photo.place}
        onClick={() => navigate(`/photos/${photo.photoID}`)}
        onDoubleClick={toggleLike}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={toggleLike}>
          {liked ? <FavoriteIcon sx={{ color: red[500] }} /> : <FavoriteIcon />}
        </IconButton>
        <p>{`${totalikes} Me gusta`}</p>
        {user.id === photo.userID ? (
          <IconButton
            aria-label="delete"
            onClick={() => {
              if (window.confirm("Are you sure?")) deletephoto(photo.photoID);
            }}
          >
            <DeleteIcon />
          </IconButton>
        ) : null}

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
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {new Date(photo.date).toLocaleDateString("es-ES")}
          </Typography>
          <Typography paragraph>{photo.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
