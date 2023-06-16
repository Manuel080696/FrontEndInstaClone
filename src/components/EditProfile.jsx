import { useContext, useState } from "react";
import { editUserDataService } from "../services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const EditProfile = ({ token }) => {
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await editUserDataService(token, data);

    navigate(`/user/${user.id}`);
    setError("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Insert name..." />
      </fieldset>
      <fieldset>
        <label htmlFor="lastName">LastName</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Insert last name..."
        />
      </fieldset>
      <fieldset>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="userName"
          placeholder="Insert a username..."
        />
      </fieldset>
      <fieldset>
        <label htmlFor="birthday">Avatar</label>
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
      <button>Edit</button>
      {error ? <p>{error}</p> : null}
    </form>
  );
};
