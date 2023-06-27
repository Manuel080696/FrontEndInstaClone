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
    <section className="userPage page-Principal">
      <h2> {`@${userData.userName} `} </h2>
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
              <img src="/avatarDefault.png" alt="" />
            )}
          </li>
          <li>
            <p>
              <em>Name:</em> {userData.name}
            </p>
            <p>
              <em>LastName:</em> {userData.lastName}
            </p>
            <p>
              <em>Birthday:</em> {userData.birthDay}
            </p>
          </li>
        </ul>
      </section>
      <section className="user-photos-list">
        <ul>
          {photoData?.map((photo) => (
            <li
              key={photo.photoID}
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
