import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserDataService } from "../services";
import "./UserPage.css";

export const UserPage = () => {
  const navigate = useNavigate();
  const [photoData, setPhotoData] = useState();
  const [userData, setUserData] = useState([]);
  const [, setError] = useState("");

  const { id } = useParams();
  useEffect(() => {
    const getUserData = async (id) => {
      try {
        const data = await getUserDataService(id);
        setPhotoData(data.photoData);
        setUserData(data.userData[0]);
      } catch (error) {
        setError(error.message);
      }
    };
    getUserData(id);
  }, [id]);

  return (
    <section className="userPage">
      <section className="userData">
        <ul>
          <li className="avatar">
            {userData.avatar ? (
              <img
                alt=""
                src={`${import.meta.env.VITE_APP_BACKEND}/uploads/avatar/${
                  userData.avatar
                }`}
              />
            ) : (
              <img
                src={`${
                  import.meta.env.VITE_APP_BACKEND
                }/uploads/avatar/avatarDefault.png`}
                alt=""
              />
            )}
          </li>
          <li>
            <p>{userData.userName}</p>

            <p>{userData.name}</p>

            <p>{userData.lastName}</p>

            <p>{userData.birthDay}</p>
          </li>
        </ul>
      </section>
      <section className="user-photos-list">
        <ul>
          {photoData?.map((photo) => (
            <li
              key={photo.PhotoID}
              onClick={() => navigate(`/photos/${photo.photoID}`)}
            >
              <img
                src={`${import.meta.env.VITE_APP_BACKEND}/uploads/posts/${
                  photo.photoName
                }`}
                alt={photo.description}
              />
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};
