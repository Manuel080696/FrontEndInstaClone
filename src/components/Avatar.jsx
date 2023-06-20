import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useUserData } from "../hooks/userData";
import "./Avatar.css";

export const Avatar = () => {
  const { user } = useContext(AuthContext);
  const { nullRute, avatar } = useUserData();

  return (
    <ul>
      {user ? (
        <li>
          {user.avatar || user.updateAvatar ? (
            <Link to={`/user/${user.id}`}>
              <img
                className="avatar footer"
                src={avatar !== nullRute ? avatar : "/avatarDefault.png"}
              />
            </Link>
          ) : (
            <img
              className="avatar footer"
              src={`${
                import.meta.env.VITE_APP_BACKEND
              }/uploads/avatar/avatarDefault.png`}
              alt={user.userName}
            />
          )}
        </li>
      ) : (
        <li>
          <img
            className="avatar footer"
            src={`${
              import.meta.env.VITE_APP_BACKEND
            }/uploads/avatar/avatarDefault.png`}
            alt={user.userName}
          />
        </li>
      )}
    </ul>
  );
};
