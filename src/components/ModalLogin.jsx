import { useContext, useState } from "react";
import { logInUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./ModalLogin.css";
import { ModalRegister } from "./ModalRegister";

export const ModalLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, isAuthenticated } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(!isAuthenticated);
  const [show, setShow] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await logInUserService({ email, password });

      logIn(data[0]);
      navigate("/");
      setShowMenu(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
    setShow(false);
  };

  const closeModals = () => {
    setShowRegisterModal(false);
    setShow(true);
  };

  if (!showMenu) {
    return null;
  }

  return (
    <>
      {show && (
        <section className="modal-bg">
          <section className="modal-fg">
            <button onClick={closeModal}>❌</button>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email..."
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </fieldset>
              <fieldset>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password..."
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </fieldset>
              <button>LogIn</button>
              {error ? <p>{error}</p> : null}
            </form>
            <p>
              Todavía no tienes cuenta?{" "}
              <button onClick={handleRegisterClick}>Register</button>
            </p>
          </section>
        </section>
      )}
      {showRegisterModal && <ModalRegister closeModal={closeModals} />}
    </>
  );
};
