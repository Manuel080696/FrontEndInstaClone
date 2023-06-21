import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserDataService } from "../services";

export const UserPage = () => {
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
  console.log(photoData);

  return (
    <section>
      <section className="user-userData">
        <ul className="user-userData-dataList">
          <li>
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
          </li>
          <li>
            <p>{userData.name}</p>
          </li>
          <li>
            <p>{userData.lastName}</p>
          </li>
          <li>
            <p>{userData.birthDay}</p>
          </li>
        </ul>
      </section>
      <section>
        <ul className="user-photos-list">
          {photoData?.map((photo) => (
            <li key={photo.PhotoID}>
              <Link to={`/photos/${photo.PhotoID}`}>
                <img
                  src={`${import.meta.env.VITE_APP_BACKEND}/uploads/posts/${
                    photo.photoName
                  }`}
                  alt={photo.description}
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};
