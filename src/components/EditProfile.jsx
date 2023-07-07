import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { editUserServices } from "../services";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./EditProfile.css";

export const EditProfile = () => {
  const { user, token, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [userName, setUserName] = useState(user.userName || user.UserName);
  const [birthDay, setBirthDay] = useState(user.birthDay);
  const [disabled, setDisabled] = useState(true);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage(file);
  };

  function handleGameClick(e) {
    e.preventDefault();
    setDisabled(!disabled);
  }

  const handleClick = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", name);
    data.append("lastName", lastName);
    data.append("userName", userName);
    data.append("birthDay", birthDay);
    if (image) {
      data.append("avatar", image);
    }

    try {
      const newDataUser = await editUserServices({ token, id: user.id, data });
      newDataUser.id = user.id;
      newDataUser.token = token;
      newDataUser.email = user.email;
      newDataUser.updateAvatar = newDataUser.updateAvatar
        ? newDataUser.updateAvatar
        : user.updateAvatar;

      setUser(newDataUser);
      navigate(`/user/${user.id}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <aside id="profile-edit">
      <h2>Edit Profile</h2>
      <form onSubmit={handleClick}>
        <TextField
          disabled={disabled}
          id="outlined-controlled"
          name="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <TextField
          disabled={disabled}
          id="outlined-controlled"
          name="lastName"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <br />
        <TextField
          disabled={disabled}
          id="outlined-controlled"
          name="userName"
          label="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <br />
        <TextField
          disabled={disabled}
          type="date"
          id="outlined-controlled"
          name="birthDay"
          label="Birthday"
          value={birthDay}
          onChange={(e) => setBirthDay(e.target.value)}
        />

        <br />

        <label className="avatar" htmlFor="avatar">
          Image(optional)
        </label>

        {/* Drop-------------- */}
        <div
          className="custom-file-input"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
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
                ? { backgroundImage: `url(${URL.createObjectURL(image)})` }
                : { backgroundImage: `url("/drop-files-here-extra.jpg")` }
            }
            onClick={() => document.getElementById("avatarUploads").click()}
          ></button>
        </div>
        <br />
        <button id="Edit" type="submit" onClick={handleGameClick}>
          Editar Perfil
        </button>
        <button className="guardar">Guardar Cambios</button>
      </form>
      {error ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert
            variant="outlined"
            severity="info"
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        </Stack>
      ) : null}
    </aside>
  );
};
