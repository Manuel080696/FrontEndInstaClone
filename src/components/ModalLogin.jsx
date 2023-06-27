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
            <box-icon name="x" color="#ffffff" onClick={closeModal} />
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email..."
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </fieldset>
              <fieldset>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password..."
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </fieldset>
              <button id="btnTitle">LogIn</button>
              {error ? <p>{error}</p> : null}
            </form>
            <p>
              {`Don't have an account yet?`}
              <em onClick={handleRegisterClick}> Register </em>
            </p>
          </section>
        </section>
      )}
      {showRegisterModal && <ModalRegister closeModal={closeModals} />}
    </>
  );
};
