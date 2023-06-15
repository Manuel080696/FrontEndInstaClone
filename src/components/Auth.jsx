import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";

export const Auth = () => {
  const { user, logOut } = useContext(AuthContext);
  const srcImage =
    user && `${import.meta.env.VITE_APP_BACKEND}/uploads/avatar/${user.avatar}`;

  return user ? (
    <section className="header-auth">
      {user.avatar ? (
        <Link to={`/user/${user.id}`}>
          <img className="header-auth-img" src={srcImage} alt={user.userName} />
        </Link>
      ) : (
        <Link to={`/user/${user.id}`}>
          <img
            className="header-auth-img"
            src="/avatarDefault.png"
            alt={user.userName}
          />
        </Link>
      )}

      <button onClick={() => logOut()}>LogOut</button>
    </section>
  ) : (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
};
