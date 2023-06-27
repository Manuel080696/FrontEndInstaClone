import { useContext, useState } from "react";
import "./ModalRegister.css";
import { ModalLogin } from "./ModalLogin";
import { registerUserService } from "../services";
import { AuthContext } from "../context/AuthContext";

export const ModalRegister = () => {
  const { toggleShowRegister } = useContext(AuthContext);
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [show, setShow] = useState(true);

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
      setShowLoginModal(true);
    } catch (error) {
      setError(
        "Ya existe un usuario con este nombre y correo electrónico, por favor, ve a iniciar sesión"
      );
    }
  };

  const closeModal = () => {
    setShow(false);
    toggleShowRegister();
  };

  const handleLoginClick = () => {
    setShow(false);
    setShowLoginModal(true);
  };

  return (
    <>
      {show && (
        <div className="modal-bg">
          <div className="modal-fg">
            <button className="close-button" onClick={closeModal}>
              ❌
            </button>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Ingrese su nombre..."
                />
              </fieldset>
              <fieldset>
                <label htmlFor="lastName">Apellido</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  placeholder="Ingrese su apellido..."
                />
              </fieldset>
              <fieldset>
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Ingrese un correo electrónico..."
                />
              </fieldset>
              <fieldset>
                <label htmlFor="username">Nombre de usuario</label>
                <input
                  type="text"
                  id="username"
                  name="userName"
                  required
                  placeholder="Ingrese un nombre de usuario..."
                />
              </fieldset>
              <fieldset>
                <label htmlFor="pass1">Contraseña</label>
                <input
                  type="password"
                  id="pass1"
                  name="password"
                  required
                  placeholder="Ingrese una contraseña..."
                  onChange={(e) => setPass1(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="pass2">Confirmar contraseña</label>
                <input
                  type="password"
                  id="pass2"
                  name="password2"
                  required
                  placeholder="Repita la contraseña..."
                  onChange={(e) => setPass2(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="birthday">Fecha de nacimiento</label>
                <input type="date" id="birthday" name="birthDay" />
              </fieldset>
              <fieldset>
                <label htmlFor="avatar">Imagen (opcional)</label>
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
              <button type="submit">Registrarse</button>
              {error && <p>{error}</p>}
              <p>
                <button type="button" onClick={handleLoginClick}>
                  Login
                </button>
              </p>
            </form>
          </div>
        </div>
      )}
      {showLoginModal && (
        <ModalLogin closeModal={() => setShowLoginModal(false)} />
      )}
    </>
  );
};
