import { registerUserService } from "../services";
import { useNavigate } from "react-router-dom";
import "./ModalRegister.css";
import { useState } from "react";

export const ModalRegister = () => {
  const navigate = useNavigate();
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError("");

    if (pass1 !== pass2) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUserService({
        data,
      });
      navigate("/modallogin");
    } catch (error) {
      setError("Ya existe un usuario con este nombre y email vete a login");
    }
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleLoginClick = () => {
    navigate("/modallogin");
  };

  return (
    show && (
      <section className="modal-bg">
        <section className="modal-fg">
          <button onClick={closeModal}>❌</button>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Insert name..."
              />
            </fieldset>
            <fieldset>
              <label htmlFor="lastName">LastName</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                placeholder="Insert last name..."
              />
            </fieldset>
            <fieldset>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Inser an email..."
              />
            </fieldset>
            <fieldset>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="userName"
                required
                placeholder="Insert a username..."
              />
            </fieldset>
            <fieldset>
              <label htmlFor="pass1">Password</label>
              <input
                type="password"
                id="pass1"
                name="password"
                required
                placeholder="Insert a password..."
                onChange={(e) => setPass1(e.target.value)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="pass2">Password</label>
              <input
                type="password"
                id="pass2"
                name="password2"
                required
                placeholder="Repeat the password..."
                onChange={(e) => setPass2(e.target.value)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="birthday">Birthday</label>
              <input type="date" id="birthday" name="birthDay" />
            </fieldset>
            <fieldset>
              <label htmlFor="avatar">Image(optional)</label>
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
                  alt="Preview"
                  style={{ width: "100px" }}
                ></img>
              ) : null}
            </fieldset>
            <button>Register</button>
            {error ? <p>{error}</p> : null}
            <p>
              <button type="button" onClick={handleLoginClick}>
                Login
              </button>
            </p>
          </form>
        </section>
      </section>
    )
  );
};
