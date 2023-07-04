import { useContext, useState } from "react";
import { editPostService } from "../services";
import { AuthContext } from "../context/AuthContext";
import "./NewPhoto.css";
import { Alert, Stack } from "@mui/joy";
import usePhotos from "../hooks/usePhotos";

export const EditPost = ({ photo, setShowEditPost }) => {
  const { editPhoto } = usePhotos();
  const [error, setError] = useState("");
  const [image, setImage] = useState();
  const { token, setShowEdit } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("photoID", photo.photoID);
      data.append("userPosted", photo.userPosted);
      data.append("place", e.target.place.value);
      data.append("description", e.target.description.value);
      data.append("image", image);

      const photoData = await editPostService({
        photoID: photo.photoID,
        data,
        token,
      });

      editPhoto(photoData, photo.photoID);
      e.target.reset();
      setImage(null);
      setShowEditPost(false);
      setShowEdit(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const closeMenu = () => {
    setShowEditPost(false);
    setShowEdit(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <section className="modal">
      <form className="posts" onSubmit={handleSubmit}>
        <span>
          <h1>Edit Post</h1>
          <box-icon name="x" color="#ffffff" onClick={closeMenu} />
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
          <label htmlFor="image"></label>
          <div
            className="drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p>Drag and drop an image here, or click to select a file</p>

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
        </fieldset>

        <button type="submit">Send</button>
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
