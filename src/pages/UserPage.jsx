import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserDataService } from "../services";
import "./UserPage.css";
import BasicTabs from "../components/BasicTabs";

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
        navigate("*");
      }
    };
    getUserData(id);
  }, [id, navigate]);

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
      <section className="userPageTabs">
        <BasicTabs photoData={photoData} />
      </section>
    </section>
  );
};
