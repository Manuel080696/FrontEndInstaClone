import { useEffect, useState } from "react";
import { getAllPhotosService, getUserPhotosService } from "../services";

const usePhotos = (id) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(false);

        const data = id
          ? await getUserPhotosService(id)
          : await getAllPhotosService();

        setPhotos(data);
      } catch (error) {
        setError(error.message);
      }
    };
    loadPhotos();
  }, [id, loading]);

  const addPhoto = (photo) => {
    setLoading(true);
    setPhotos([photo, ...photos]);
  };

  const removePhoto = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  return { photos, loading, error, addPhoto, removePhoto };
};

export default usePhotos;
