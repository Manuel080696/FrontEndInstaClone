import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";
import { deleteUserService } from "../services";
import { useUserData } from "../hooks/userData";

export const Auth = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { nullRute, avatar } = useUserData();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const deleteUser = () => {
    deleteUserService(user.token, user.id);
    logOut();
  };

  return (
    <section>
      {user ? (
        <ul>
          <li>
            <Link to={`/user/${user.id}`}>{user.userName} </Link>
            {user.updateAvatar || user.avatar ? (
              <img
                alt={user.userName}
                src={`${import.meta.env.VITE_APP_BACKEND}/uploads/avatar/${
                  user.updateAvatar ? user.updateAvatar : user.avatar
                }`}
              />
            ) : (
              <img
                src={`${
                  import.meta.env.VITE_APP_BACKEND
                }/uploads/avatar/avatarDefault.png`}
                alt={user.userName}
              />
            )}
          </li>
          <li>
            <button onClick={() => navigate("/search")}>🔎</button>
          </li>
          <li>
            <nav className="auth-menu">
              <div
                className={`hamburger ${isMenuOpen ? "active" : ""}`}
                onClick={toggleMenu}
              >
                <div className="line" />
                <div className="line" />
                <div className="line" />
              </div>

              <ul className={`menu-items ${isMenuOpen ? "active" : ""}`}>
                <li>
                  <button onClick={() => navigate("/user/profile")}>
                    Edit profile
                  </button>
                </li>
                <li>
                  <button onClick={() => deleteUser()}>Delete profile</button>
                </li>
                <li>
                  <button onClick={() => logOut()}>LogOut</button>
                </li>
              </ul>
            </nav>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </section>
  );
};
