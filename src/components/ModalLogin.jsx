import { useContext, useState } from "react";
import { logInUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./ModalLogin.css";
import { ModalRegister } from "./ModalRegister";
import { ModalRecover } from "./ModalRecover";
import { ModalReset } from "./ModalReset";
import { ModalContext } from "../context/ModalContext";
import { Alert, Stack } from "@mui/joy";

export const ModalLogin = () => {
  const { logIn } = useContext(AuthContext);
  const {
    showResetModal,
    setShowResetModal,
    setShowRegister,
    showLogin,
    setShowLogin,
    showRegister,
  } = useContext(ModalContext);
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
              {error ? (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="warning" onClose={() => setError("")}>
                    {error}
                  </Alert>
                </Stack>
              ) : null}
            </form>
            <p onClick={handleRecoverClick}>
              <em>{`Have you forgotten your password?`}</em>
            </p>
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
