import { useState } from "react";
import { searchPhotosService } from "../services";

function Search() {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const SearchInput = () => {
    const handleSearch = async (e) => {
      e.preventDefault();
      const data = await searchPhotosService(searchTerm);
      setPhotos(data);
    };
    return (
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>🔎</button>
      </form>
    );
  };

  return (
    <div>
      <SearchInput />
      <div>
        {photos.map((photo, index) => (
          <div key={index}>
            <img
              src={`${import.meta.env.VITE_APP_BACKEND}/uploads/posts/${
                photo.photoName
              }`}
              alt="Foto"
            />
            <p>Description: {photo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Search;
