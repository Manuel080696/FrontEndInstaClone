import { useState } from "react";
import usePhotos from "../hooks/usePhotos";
import { useNavigate } from "react-router-dom";

export const SearchInput = () => {
  const navigate = useNavigate();
  const { fetchPhotos } = usePhotos();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPhotos(searchTerm);
    navigate("/search");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button>Search</button>
    </form>
  );
};
