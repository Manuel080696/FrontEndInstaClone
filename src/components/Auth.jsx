import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { deleteUserService } from "../services";
import "./Auth.css";
import AlertDialog from "./AlertDialog";
import { ModalLogin } from "./ModalLogin";
import { ModalContext } from "../context/ModalContext";

export const Auth = () => {
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  const { showLogin, setShowLogin } = useContext(ModalContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [delUser, setDelUser] = useState(false);
  const [logoutUser, setLogoutUser] = useState(false);

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
            <nav className="auth-menu" ref={menuRef}>
              <div
                className={`hamburger ${isMenuOpen ? "active" : ""}`}
                onClick={toggleMenu}
              >
                <box-icon
                  id="icono-hamburgesa"
                  name="menu"
                  color="#ffffff"
                ></box-icon>
              </div>

              <ul className={`menu-items ${isMenuOpen ? "active" : ""}`}>
                <li
                  onClick={() => {
                    navigate("/user/profile");
                    closeMenu();
                  }}
                >
                  Edit profile
                </li>
                <li onClick={() => setDelUser(!delUser)}>Delete profile</li>
                {delUser ? (
                  <AlertDialog
                    deleteService={deleteUser}
                    text={"Are you sure you want to delete your profile?"}
                    setState={setDelUser}
                  />
                ) : null}

                <li onClick={() => setLogoutUser(true)}>Quit</li>
                {logoutUser ? (
                  <AlertDialog
                    deleteService={logOut}
                    text={"Are you sure you want to quit?"}
                    setState={setLogoutUser}
                    setIsMenuOpen={setIsMenuOpen}
                  />
                ) : null}
              </ul>
            </nav>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <button
              className="openLoginModal"
              onClick={() => setShowLogin(true)}
            >
              <box-icon name="log-in-circle" color="#ffffff"></box-icon>
            </button>
          </li>
        </ul>
      )}
      {showLogin && <ModalLogin />}
    </section>
  );
};
