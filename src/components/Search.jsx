import { useState } from "react";
import { searchPhotosService } from "../services";
import "./Search.css";

function Search() {
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
              src={`${import.meta.env.VITE_APP_BACKEND}/uploads/posts/${
                photo.photoName
              }`}
              alt="Foto"
            />
            <p>Description: {photo.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default Search;
