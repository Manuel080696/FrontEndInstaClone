import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Avatar.css";

export const Avatar = () => {
  const { user } = useContext(AuthContext);

  return (
    <ul>
      {user ? (
        <li>
          {user.avatar || user.updateAvatar ? (
            <Link to={`/user/${user.id}`}>
              <img
                className="avatar footer"
                src={`${import.meta.env.VITE_APP_BACKEND}/uploads/avatar/${
                  user.avatar || user.updateAvatar
                }`}
                alt={user.userName}
              />
            </Link>
          ) : (
            <Link to={`/user/${user.id}`}>
              <img
                className="avatar footer"
                src="/avatarDefault.png"
                alt={user.userName}
              />
            </Link>
          )}
        </li>
      ) : (
        <li>
          <img
            className="avatar footer"
            src="/avatarDefault.png"
            alt={user.userName}
          />
        </li>
      )}
    </ul>
  );
};
