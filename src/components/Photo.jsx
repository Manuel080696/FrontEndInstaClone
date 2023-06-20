import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { deletePhotoService, likePhotoService } from "../services";
import "boxicons";

export const Photo = ({ photo, removePhoto }) => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(photo.dioLike);
  const [totalikes, setTotalikes] = useState(photo.numLikes);

  const srcImage = `${import.meta.env.VITE_APP_BACKEND}/uploads/posts/${
    photo.photoName
  }`;

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

  return (
    <article className="post">
      {photo.photoName ? (
        <section className="post-image">
          <object
            className="like-button-object"
            type="image/svg+xml"
            data={liked ? "/likeAnimated.svg" : null}
            style={{
              objectFit: "contain",
              height: "auto",
              pointerEvents: "none",
            }}
          />
          <img
            onClick={() => navigate(`/photos/${photo.photoID}`)}
            onDoubleClick={toggleLike}
            src={srcImage}
            alt={photo.description}
          ></img>
        </section>
      ) : null}
      <p>{photo.description}</p>
      <ul className="reactionsBar">
        <li className="reactionsBar-reaction">
          <button className="reactionsBar-like-button" onClick={toggleLike}>
            {liked ? (
              <box-icon
                className="iconLiked"
                name="heart"
                type="solid"
                color="#FF0000"
              ></box-icon>
            ) : (
              <box-icon name="heart" type="solid" color="#F5BDBD"></box-icon>
            )}
          </button>
          <p>{totalikes}</p>
        </li>

        <li className="reactionsBar-reaction">
          <button
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={handleClick}
          >
            <box-icon name="message-rounded"></box-icon>
          </button>
          <p>{photo.numComments}</p>
        </li>
      </ul>
      {user.id === photo.userID ? (
        <section>
          <button
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={() => {
              if (window.confirm("Are you sure?")) deletephoto(photo.photoID);
            }}
          >
            <box-icon type="solid" name="trash"></box-icon>
          </button>
          {error ? <p>{error}</p> : null}
        </section>
      ) : null}
    </article>
  );
};
