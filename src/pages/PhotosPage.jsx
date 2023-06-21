import { useContext, useEffect, useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";

import { Link, useNavigate, useParams } from "react-router-dom";

import "boxicons";
import { AuthContext } from "../context/AuthContext";
import {
  deletePhotoService,
  getSinglePhotoService,
  likePhotoService,
} from "../services";
import usePhotos from "../hooks/usePhotos";

export const PhotosPage = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likeNumber, setLikeNumber] = useState();
  const [photo, setPhoto] = useState([]);
  const [error, setError] = useState("");
  const { user, token } = useContext(AuthContext);
  const [photoUser, setPhotoUser] = useState();
  const [idUser, setIdUser] = useState();
  const [userName, setUserName] = useState();
  const navigate = useNavigate();
  const { removePhoto } = usePhotos();

  useEffect(() => {
    const loadPhoto = async () => {
      try {
        setLoading(false);
        const data = await getSinglePhotoService(id);
        setPhotoUser(data.avatar);
        setIdUser(data.id);
        setComments(data.comments);
        setLikeNumber(data.numeroLikes);
        setUserName(data.userName);
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

  const toggleLike = async () => {
    try {
      const data = await likePhotoService(token, id);
      setLiked(data.vote);
      setLikeNumber(data.likes);
    } catch (error) {
      alert(error.message);
    }
  };
  const handleClick = async () => {
    navigate(`/comments/${id}`);
  };
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
      <aside>
        <Link to={`/user/${idUser}`}>
          <img
            className="avatar"
            src={
              photoUser
                ? `${
                    import.meta.env.VITE_APP_BACKEND
                  }/uploads/avatar/${photoUser}`
                : `${
                    import.meta.env.VITE_APP_BACKEND
                  }/uploads/avatar/avatarDefault.png`
            }
          />
          {userName}
        </Link>
      </aside>
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
          <button className="reactionsBar-comment-button" onClick={handleClick}>
            <box-icon name="message-rounded"></box-icon>
          </button>
          {comments.length}
        </li>
      </ul>
      {user.id === idUser ? (
        <section>
          <button
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={() => {
              if (window.confirm("Are you sure?")) deletephoto(id);
              navigate("/");
            }}
          >
            <box-icon type="solid" name="trash"></box-icon>
          </button>
          {error ? <p>{error}</p> : null}
        </section>
      ) : null}
    </section>
  );
};
