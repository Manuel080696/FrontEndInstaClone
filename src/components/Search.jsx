import { useState } from "react";
import { searchPhotosService } from "../services";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import CustomizedSnackbars from "./CustomizedSnackbars";

function Search() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await searchPhotosService(searchTerm);
      setPhotos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setSearchTerm("");
    }
  };

  return (
    <aside id="searchAside">
      <form className="search" onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <box-icon name="search" color="#ffffff"></box-icon>
        </button>
      </form>
      {error && (
        <CustomizedSnackbars
          message={error}
          severity={"error"}
          setError={setError}
        />
      )}
      <section className="search">
        <ul className="search" id="cua">
          {photos &&
            photos?.map((photo) => (
              <li key={photo.photoID}>
                <img
                  onClick={() => navigate(`/photos/${photo.photoID}`)}
                  src={`${import.meta.env.VITE_APP_BACKEND}/uploads/posts/${
                    photo.photoName
                  }`}
                  alt="Foto"
                ></img>
              </li>
            ))}
        </ul>
      </section>
    </aside>
  );
}
export default Search;
