import { useContext, useState } from "react";
import { logInUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./ModalLogin.css";
import { ModalRegister } from "./ModalRegister";
import { ModalRecover } from "./ModalRecover";
import { ModalReset } from "./ModalReset";

export const ModalLogin = () => {
  const {
    setShowRegister,
    showLogin,
    setShowLogin,
    showRegister,
    logIn,
    showResetModal,
    setShowResetModal,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showRecoverModal, setShowRecoverModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await logInUserService({ email, password });

      logIn(data[0]);
      navigate("/");
      setShowLogin(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const closeModal = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleRecoverClick = () => {
    setShowLogin(false);
    setShowRecoverModal(true);
  };

  return (
    <>
      {showLogin && (
        <section className="modal-bg">
          <section className="modal-fg login">
            <box-icon name="x" color="#ffffff" onClick={closeModal} />
            <h1>Login</h1>
            <img className="modal-img" src="/halcon (2).webp" />
            <form onSubmit={handleSubmit}>
              <fieldset>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </fieldset>
              <fieldset>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </fieldset>
              <button id="btnTitle">LogIn</button>
              {error ? <p>{error}</p> : null}
            </form>
            <p
              onClick={handleRecoverClick}
            >{`Have you forgotten your password?`}</p>
            <p>
              {`Don't have an account yet?`}
              <em onClick={handleRegisterClick}> Register </em>
            </p>
          </section>
        </section>
      )}
      {showRegister && <ModalRegister />}
      {showRecoverModal && (
        <ModalRecover
          showRecoverModal={showRecoverModal}
          setShowRecoverModal={setShowRecoverModal}
          setShowResetModal={setShowResetModal}
        />
      )}
      {showResetModal && <ModalReset setShowResetModal={setShowResetModal} />}
    </>
  );
};
