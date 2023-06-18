import { useContext, useEffect, useState } from "react";
import { getAllPhotosService, getUserPhotosService } from "../services";
import { AuthContext } from "../context/AuthContext";

const usePhotos = (id) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(false);

        const data = id
          ? await getUserPhotosService(id, token)
          : await getAllPhotosService(token);

        setPhotos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadPhotos();
  }, [id, loading, token]);

  const addPhoto = (photo) => {
    setLoading(true);
    setPhotos([photo, ...photos]);
  };

  const fetchPhotos = (searchTerm) => {
    const apiUrl = `${
      import.meta.env.VITE_APP_BACKEND
    }/photos?search=${searchTerm}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data.data);
      })
      .catch((error) => {
        console.error("Error al obtener las fotos:", error);
      });
  };

  const removePhoto = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  return { photos, loading, error, addPhoto, removePhoto, fetchPhotos };
};

export default usePhotos;
