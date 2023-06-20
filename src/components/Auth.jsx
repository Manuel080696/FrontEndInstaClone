import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { deleteUserService } from "../services";
import { useUserData } from "../hooks/userData";

export const Auth = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { nullRute, avatar } = useUserData();
  const navigate = useNavigate();

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const deleteUser = () => {
    deleteUserService(user.token, user.id);
    logOut();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <section>
      {user ? (
        <ul>
          <li>
            {user.avatar || user.updateAvatar ? (
              <Link to={`/user/${user.id}`}>
                <img
                  src={avatar !== nullRute ? avatar : "/avatarDefault.png"}
                />
              </Link>
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
            <button onClick={() => navigate("/search")}>
              <box-icon name="search"></box-icon>
            </button>
          </li>
          <li>
            <nav className="auth-menu" ref={menuRef}>
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
                  <Link to="/user/profile" onClick={closeMenu}>
                    <button>Edit profile</button>
                  </Link>
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
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>
          </li>
        </ul>
      )}
    </section>
  );
};
