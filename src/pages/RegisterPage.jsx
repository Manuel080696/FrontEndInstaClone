import { useState } from "react";
import { registerUserService } from "../services";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [birthday, setBirthday] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (pass1 !== pass2) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUserService({
        name,
        lastName,
        email,
        userName,
        password: pass1,
        birthday,
      });
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
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
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setLastName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="Insert a username..."
            onChange={(e) => setUserName(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="pass1">Password</label>
          <input
            type="password"
            id="pass1"
            name="pass1"
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
            name="pass2"
            required
            placeholder="Repeat the password..."
            onChange={(e) => setPass2(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="birthday">Name</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            onChange={(e) => setBirthday(e.target.value)}
          />
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
      </form>
    </section>
  );
};
