import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { editUserServices } from "../services";

import TextField from "@mui/material/TextField";

export const EditProfile = () => {
  const { user, token, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [userName, setUserName] = useState(user.userName || user.UserName);
  const [birthDay, setBirthDay] = useState(user.birthDay);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    try {
      const newDataUser = await editUserServices({ token, id: user.id, data });
      console.log(newDataUser.updateAvatar);
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
  function handleGameClick(e) {
    e.preventDefault();
    setDisabled(!disabled);
  }

  return (
    <>
      <h1>Edit Profile</h1>
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

        <label htmlFor="avatar">Image(optional)</label>
        <input type="file" id="avatar" name="avatar" accept="image/*" />
        <br />
        <button>Guardar Cambios</button>
        <button type="submit" onClick={handleGameClick}>
          Editar Perfil
        </button>
        {error ? <p>{error}</p> : null}
      </form>
    </>
  );
};
