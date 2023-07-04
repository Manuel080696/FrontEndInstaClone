import { useContext, useState } from "react";
import "./ModalLogin.css";
import { ModalLogin } from "./ModalLogin";
import { registerUserService } from "../services";
import { AuthContext } from "../context/AuthContext";

export const ModalRegister = () => {
  const { setShowLogin, showLogin, showRegister, setShowRegister } =
    useContext(AuthContext);
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError("");
    handleLoginClick();

    if (pass1 !== pass2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await registerUserService({
        data,
      });
      setShowLogin(true);
    } catch (error) {
      setError(
        "Ya existe un usuario con este nombre y correo electrónico, por favor, ve a iniciar sesión"
      );
    }
  };

  const closeModal = () => {
    setShowRegister(false);
  };

  const handleLoginClick = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <>
      {showRegister && (
        <div className="modal-bg">
          <div id="white" className="modal-fg login">
            <box-icon name="x" color="#ffffff" onClick={closeModal} />
            <h1>Register</h1>
            <form id="regis" onSubmit={handleSubmit}>
              <fieldset>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Name"
                />
              </fieldset>
              <fieldset>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  placeholder="Lastname"
                />
              </fieldset>
              <fieldset>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Email"
                />
              </fieldset>
              <fieldset>
                <input
                  type="text"
                  id="username"
                  name="userName"
                  required
                  placeholder="User name"
                />
              </fieldset>
              <fieldset>
                <input
                  type="password"
                  id="pass1"
                  name="password"
                  required
                  placeholder="Password"
                  onChange={(e) => setPass1(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <input
                  type="password"
                  id="pass2"
                  name="password2"
                  required
                  placeholder="Password confirmed"
                  onChange={(e) => setPass2(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="birthday">Birthday</label>
                <input type="date" id="birthday" name="birthDay" />
              </fieldset>
              <fieldset>
                <label htmlFor="avatar">Image (opcional)</label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="Vista previa"
                    style={{ width: "100px" }}
                  ></img>
                ) : null}
              </fieldset>
              <button id="btnSubmit" type="submit">
                Register
              </button>
              {error && <p>{error}</p>}
              <p>
                Do you already have an account?
                <em onClick={handleLoginClick}> Login </em>
              </p>
            </form>
          </div>
        </div>
      )}
      {showLogin && <ModalLogin closeModal={() => setShowLogin(true)} />}
    </>
  );
};
