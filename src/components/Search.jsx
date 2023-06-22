import { useState } from "react";
import { searchPhotosService } from "../services";
import "./Search.css";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await searchPhotosService(searchTerm);
    setPhotos(data);
    setSearchTerm("");
  };
  return (
    <section>
      <form className="search" onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <box-icon name="search" color="#ffffff"></box-icon>
        </button>
      </form>
      <ul className="search">
        {photos.map((photo, index) => (
          <li key={index}>
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
  );
}
export default Search;
