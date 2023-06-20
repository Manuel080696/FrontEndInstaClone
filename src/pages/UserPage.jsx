import { useUserData } from "../hooks/userData";

export const UserPage = () => {
  const { nullRute, avatar, userData } = useUserData();

  const userDataInfo = userData && userData.userData[0];
  const userPhotoData = userData && userData.photoData;

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
          <li>
            <p>{userDataInfo.birthday}</p>
          </li>
        </ul>
      </section>
      <section>
        <ul className="user-photos-list">
          {userPhotoData &&
            userPhotoData?.map((photo, index) => (
              <li key={index}>
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
