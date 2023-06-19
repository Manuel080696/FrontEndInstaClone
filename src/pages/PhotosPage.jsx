import { useContext, useEffect, useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";

import { useParams } from "react-router-dom";

import "boxicons";
import { AuthContext } from "../context/AuthContext";
import { getSinglePhotoService } from "../services";

export const PhotosPage = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likeNumber, setLikeNumber] = useState();
  const [photo, setPhoto] = useState([]);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadPhoto = async () => {
      try {
        setLoading(false);
        const data = await getSinglePhotoService(id);

        setComments(data.comments);
        setLikeNumber(data.numeroLikes);
        setPhoto(
          `${import.meta.env.VITE_APP_BACKEND}/uploads/posts/${data.photoName}`
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadPhoto();
  }, [id, loading, photo]);

  const toggleLike = () => {
    setLiked(!liked);
    if (liked === true) {
      setLikeNumber(likeNumber - 1);
    } else {
      setLikeNumber(likeNumber + 1);
    }
  };

  // Cuando se está cargando
  if (loading) {
    return <p>Cargando photos...</p>;
  }
  // Porsi ocurre algún error
  if (error) {
    return <ErrorMessage message={error} />;
  }
  return (
    <section className="imgPage">
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
      <img onDoubleClick={toggleLike} src={photo} alt="Photo" />

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
          {likeNumber}
        </li>

        <li className="reactionsBar-reaction">
          <button className="reactionsBar-comment-button">
            <box-icon name="message-rounded"></box-icon>
          </button>
          {comments.length}
        </li>
      </ul>

      <aside>
        <img
          className="avatar"
          src={`${import.meta.env.VITE_APP_BACKEND}/uploads/avatar/${
            user.avatar
          }`}
        />
        <span>{user.name} </span>
      </aside>
    </section>
  );
};
