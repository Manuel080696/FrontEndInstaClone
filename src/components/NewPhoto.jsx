import { useContext, useState } from "react";
import { sendPhotoService } from "../services";
import { AuthContext } from "../context/AuthContext";
import "./NewPhoto.css";
import { Alert, Stack } from "@mui/joy";

export const NewPhoto = ({ addPhoto, toggleShow }) => {
  const [error, setError] = useState("");
  const [image, setImage] = useState();

  const { token, user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.target);

      const photo = await sendPhotoService({ data, token });

      photo.Date = new Date().toLocaleDateString("es-ES");
      photo.avatar = user.avatar || user.updateAvatar;
      photo.userPosted = user.UserName;

      addPhoto(photo);
      e.target.reset();
      setImage(null);
      toggleShow();
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <section className="modal">
      <form className="posts" onSubmit={handleSubmit}>
        <span>
          <h1>New Post</h1>
          <box-icon name="x" color="#ffffff" onClick={() => toggleShow()} />
        </span>

        <fieldset>
          <input
            type="text"
            id="place"
            name="place"
            placeholder="Place"
            required
          />
        </fieldset>
        <fieldset>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            required
          />
        </fieldset>
        <fieldset>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            placeholder="Image(optional"
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ width: "100px" }}
            ></img>
          ) : null}
        </fieldset>

        <button>Send</button>
        {error ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert
              variant="outlined"
              severity="warning"
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          </Stack>
        ) : null}
      </form>
    </section>
  );
};
