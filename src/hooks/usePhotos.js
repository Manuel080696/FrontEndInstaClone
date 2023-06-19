import { useContext, useEffect, useState } from "react";
import { getAllPhotosService, getUserPhotosService } from "../services";
import { AuthContext } from "../context/AuthContext";

const usePhotos = (id) => {
  const [photos, setPhotos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  //Photos general
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

  const removePhoto = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  return { photos, loading, error, addPhoto, removePhoto };
};

export default usePhotos;
