import { useContext, useEffect, useState } from "react";
import { getAllPhotosService } from "../services";
import { AuthContext } from "../context/AuthContext";

const usePhotos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { token, photos, setPhotos } = useContext(AuthContext);

  //Photos general
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await getAllPhotosService(token);

        setPhotos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadPhotos();
  }, [loading]);

  const addPhoto = (photo) => {
    setPhotos([photo, ...photos]);
  };

  function editPhoto(photo, id) {
    const photoEdit = photos.find((photo) => photo.photoID === id);

    photoEdit.description = photo.description;
    photoEdit.place = photo.place;
    photoEdit.updatePhoto = photo.updatePhoto;
    photoEdit.photoName = photo.updatePhoto;

    setLoading(true);
  }

  const removePhoto = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
    setLoading(true);
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
