import { useContext, useState } from "react";
import { ModalLogin } from "./ModalLogin";
import { registerUserService } from "../services";
import "./ModalLogin.css";
import { ModalContext } from "../context/ModalContext";
import { Alert, Stack } from "@mui/joy";

export const ModalRegister = () => {
  const { setShowLogin, showLogin, showRegister, setShowRegister } =
    useContext(ModalContext);
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [image, setImage] = useState();
  const [error, setError] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass1 !== pass2) {
      setError("Passwords do not match");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", e.target.name.value);

      data.append("lastName", e.target.lastName.value);
      data.append("userName", e.target.username.value);
      data.append("email", e.target.email.value);
      data.append("password", e.target.pass1.value);
      data.append("password2", e.target.pass2.value);
      data.append("birthDay", e.target.birthday.value);
      if (image) data.append("avatar", image);

      await registerUserService({ data });

      setImage(null);
      setShowLogin(true);
      handleLoginClick();
    } catch (error) {
      setError(error.message);
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
          <div id="white" className="modal-fg login register">
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

              <fieldset className="avatar">
                <label htmlFor="image"></label>
                <div
                  className="drop-area"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <p>Drag and drop here, or click to select a file</p>

                  <input
                    id="avatarUploads"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => setImage(e.target.files[0])}
                  />

                  <button
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    id="avatar"
                    type="button"
                    style={
                      image
                        ? {
                            backgroundImage: `url(${URL.createObjectURL(
                              image
                            )})`,
                          }
                        : {
                            backgroundImage: `url(/drop-files-here-extra.jpg)`,
                          }
                    }
                    onClick={() =>
                      document.getElementById("avatarUploads").click()
                    }
                  ></button>
                </div>
              </fieldset>
              {/* aqui acaba */}
              <button id="btnSubmit" type="submit">
                Register
              </button>
              {error ? (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="warning" onClose={() => setError("")}>
                    {error}
                  </Alert>
                </Stack>
              ) : null}
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
