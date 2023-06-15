import { useContext, useEffect, useState } from "react";
import { getUserDataService } from "../services";
import "./UserPage.css";
import { AuthContext } from "../context/AuthContext";

export const UserPage = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState("");

  const userDataInfo = userData && userData.userData[0];
  const userPhotoData = userData && userData.photoData;

  const nullRute = `${import.meta.env.VITE_APP_BACKEND}/uploads/avatar/null`;

  useEffect(() => {
    const getUserAvatar = async (id) => {
      try {
        const data = await getUserDataService(id);

        const ruta = `${import.meta.env.VITE_APP_BACKEND}/uploads/avatar/${
          data.userData[0].avatar
        }`;
        setAvatar(ruta);
        setUserData(data);
      } catch (error) {
        setError(error.message);
      }
    };
    getUserAvatar(user.id);
  }, [user.id]);

  return (
    <section>
      <section className="user-userData">
        <img src={avatar !== nullRute ? avatar : "/avatarDefault.png"} />
        <ul className="user-userData-dataList">
          <li>
            <p>{userDataInfo.userName}</p>
          </li>
          <li>
            <p>{userDataInfo.name}</p>
          </li>
          <li>
            <p>{userDataInfo.lastName}</p>
          </li>
        </ul>
      </section>
      <section>
        <ul className="user-photos-list">
          {userPhotoData &&
            userPhotoData?.map((photo) => (
              <li key={photo.photoID}>
                <img
                  src={`${import.meta.env.VITE_APP_BACKEND}/uploads/posts/${
                    photo.photoName
                  }`}
                  alt=""
                ></img>
              </li>
            ))}
        </ul>
      </section>
    </section>
  );
};
