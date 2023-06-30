import { useContext, useEffect, useState } from "react";
import { getAllPhotosService, getUserPhotosService } from "../services";
import { AuthContext } from "../context/AuthContext";

const usePhotos = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token, photos, setPhotos } = useContext(AuthContext);

  //Photos general
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = id
          ? await getUserPhotosService(id, token)
          : await getAllPhotosService(token);

        setPhotos(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };
    loadPhotos();
  }, [id, setPhotos, token, loading, photos]);

  const addPhoto = (photo) => {
    setPhotos([photo, ...photos]);
    setLoading(false);
  };
  const editPhoto = (photo) => {
    const obj = {
      ...photo,
    };
    photo.description = obj.description;
    photo.place = obj.place;
    photo.updatePhoto = obj.updatePhoto;
    setLoading(false);
  };

  const removePhoto = (id) => {
    setLoading(true);
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  return {
    photos,
    loading,
    error,
    addPhoto,
    removePhoto,
    editPhoto,
  };
};

export default usePhotos;
