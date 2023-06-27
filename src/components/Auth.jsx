import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { deleteUserService } from "../services";
import "./Auth.css";
import AlertDialog from "./AlertDialog";
import { ModalLogin } from "./ModalLogin";

export const Auth = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [delUser, setDelUser] = useState(false);
  const [logoutUser, setLogoutUser] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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

  const openLoginModal = () => {
    setIsLoginModalOpen(false); // <- Aquí establecemos el estado en false antes de abrir el modal nuevamente
    setTimeout(() => {
      setIsLoginModalOpen(true);
    }, 0);
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
                <li>
                  <Link to="/user/profile" onClick={closeMenu}>
                    Edit profile
                  </Link>
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
                  />
                ) : null}
              </ul>
            </nav>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <button className="openLoginModal" onClick={openLoginModal}>
              <box-icon name="power-off" color="#FFFFFF"></box-icon>
            </button>
          </li>
        </ul>
      )}
      {isLoginModalOpen && <ModalLogin />}
    </section>
  );
};
