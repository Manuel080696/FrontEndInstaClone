import { useEffect, useState } from "react";
import { getAllPhotosService, getUserPhotosService } from "../services";

const usePhotos = (id) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);

        const data = id
          ? await getUserPhotosService(id)
          : await getAllPhotosService();

        setPhotos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadPhotos();
  }, [id]);

  const addPhoto = (photo) => {
    setPhotos([photo, ...photos]);
  };

  const removePhoto = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  return { photos, loading, error, addPhoto, removePhoto };
};

export default usePhotos;
