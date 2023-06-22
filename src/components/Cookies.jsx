import { Link } from "react-router-dom";
import { useState } from "react";
import "./Cookies.css";

export const Cookies = () => {
  const [show, setShow] = useState(true);

  const closeModal = () => {
    setShow(false);
  };

  return (
    show && (
      <div className="modal-bg">
        <div className="modal-fg">
          <ul>
            <li onClick={closeModal}>
              <Link to="/">
                <p>Pagina Inicial</p>
              </Link>
            </li>
            <li onClick={closeModal}>
              <Link to="/register">Register</Link>
            </li>
            <li onClick={closeModal}>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
        <button onClick={closeModal}>❌</button>
      </div>
    )
  );
};
