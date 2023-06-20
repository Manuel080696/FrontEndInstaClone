import { useState } from "react";
import { searchPhotosService } from "../services";
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
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <box-icon name="search"></box-icon>
        </button>
      </form>
      <ul>
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
