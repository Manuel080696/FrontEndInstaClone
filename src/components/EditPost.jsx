import { useContext, useState } from "react";
import { editPostService } from "../services";
import { AuthContext } from "../context/AuthContext";
import "./NewPhoto.css";
import "./ModalLogin.css";
import { Alert, Stack } from "@mui/joy";
import usePhotosServices from "../hooks/usePhotosServices";
import { ModalContext } from "../context/ModalContext";

export const EditPost = ({ photo, setShowEditPost }) => {
  const { editPhoto } = usePhotosServices();
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const { token } = useContext(AuthContext);
  const { setShowEdit } = useContext(ModalContext);

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
    const data = new FormData();
    data.append("place", e.target.place.value);
    data.append("description", e.target.description.value);
    if (image) {
      data.append("image", image);
    }

    try {
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
    } finally {
      data.append("place", null);
      data.append("description", null);
      data.append("image", null);
    }
  };

  console.log(photo);

  const closeMenu = () => {
    setShowEditPost(false);
    setShowEdit(false);
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
          <label htmlFor="avatar"></label>
          <div
            className="drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p>Drag and drop an image here, or click to select a file</p>

            <input
              id={`editPostUpload${photo.photoID}`}
              type="file"
              name="image"
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
              onClick={() =>
                document
                  .getElementById(`editPostUpload${photo.photoID}`)
                  .click()
              }
            ></button>
          </div>
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
