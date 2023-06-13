import { useContext, useState } from "react";
import { sendPhotoService } from "../services";
import { AuthContext } from "../context/AuthContext";

export const NewPhoto = ({ addPhoto }) => {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState();
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);

      const data = new FormData(e.target);

      const photo = await sendPhotoService({ data, token });

      addPhoto(photo);
      e.target.reset();
      setImage(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new Photo</h1>
      <fieldset>
        <label htmlFor="place">Place</label>
        <input type="text" id="place" name="place" required />
      </fieldset>
      <fieldset>
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" required />
      </fieldset>
      <fieldset>
        <label htmlFor="image">Image(optional)</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
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

      <button>Send Photo</button>
      {sending ? <p>Sending photo</p> : null}
      {error ? <p>{error}</p> : null}
    </form>
  );
};
