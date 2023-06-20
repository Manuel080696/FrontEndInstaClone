import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { deleteUserService } from "../services";
import "./Auth.css";

export const Auth = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                <li>
                  <Link to="/user/profile" onClick={closeMenu}>
                    Editar perfil
                  </Link>
                </li>
                <li onClick={() => deleteUser()}>Borrar perfil</li>
                <li onClick={() => logOut()}>Salir</li>
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
