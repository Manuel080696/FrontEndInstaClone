import { useContext, useEffect, useState } from "react";
import { getAllPhotosService } from "../services";
import { AuthContext } from "../context/AuthContext";

const usePhotos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token, photos, setPhotos, favorites, setFavorites } =
    useContext(AuthContext);

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

  const addToFavorites = (photoToAdd) => {
    const photoExists = favorites.find(
      (photo) => photo.photoID === photoToAdd.photoID
    );
    if (!photoExists) {
      setFavorites([...favorites, photoToAdd]);
    }
  };
  const removeFromFavorites = (photoToRemove) => {
    const favoritesFiltered = favorites.filter(
      (photo) => photo.photoID !== photoToRemove.photoID
    );
    setFavorites(favoritesFiltered);
  };

  return {
    photos,
    loading,
    error,
    addPhoto,
    removePhoto,
    editPhoto,
    addToFavorites,
    removeFromFavorites,
  };
};

export default usePhotos;
