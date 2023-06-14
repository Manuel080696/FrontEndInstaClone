import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { deletePhotoService, getUserDataService } from "../services";
import "./Photo.css";

export const Photo = ({ photo, removePhoto }) => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState("");
  const srcImage = `${import.meta.env.VITE_APP_BACKEND}/uploads/posts/${
    photo.photoName
  }`;
  const nullRute = `${import.meta.env.VITE_APP_BACKEND}/uploads/avatar/null`;

  useEffect(() => {
    const getUserAvatar = async (id) => {
      try {
        const data = await getUserDataService(id);

        const ruta = `${import.meta.env.VITE_APP_BACKEND}/uploads/avatar/${
          data.userData[0].avatar
        }`;
        setAvatar(ruta);
      } catch (error) {
        setError(error.message);
      }
    };
    getUserAvatar(photo.userID || photo.id);
  }, [photo.userID, avatar, photo.id]);

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

  return (
    <article className="post">
      <span id="post-user">
        <img
          className="post-user-userAvatar"
          src={avatar !== nullRute ? avatar : "/avatarDefault.png"}
        ></img>

        <Link to={`/user/${photo.userID}`}>
          <p>{photo.userPosted}</p>
        </Link>
      </span>
      {photo.photoName ? (
        <img
          className="post-image"
          src={srcImage}
          alt={photo.description}
        ></img>
      ) : null}
      <p>{photo.description}</p>
      <p>
        <Link to={`/photo/${photo.photoID}`}>
          {new Date(photo.date).toLocaleString()}
        </Link>
      </p>

      {user && user.userName === photo.userPosted ? (
        <section>
          <button
            onClick={() => {
              if (window.confirm("Are you sure?")) deletephoto(photo.photoID);
            }}
          >
            Delete photo
          </button>
          {error ? <p>{error}</p> : null}
        </section>
      ) : null}
    </article>
  );
};
