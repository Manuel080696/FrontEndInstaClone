import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const usePhotosServices = () => {
  const { photos, setPhotos, favorites, setFavorites } =
    useContext(AuthContext);
  const [, setLoading] = useState(true);

  const addPhoto = (photo) => {
    setPhotos([photo, ...photos]);
  };

  const removePhoto = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
    setLoading(true);
  };

  function editPhoto(photo, id) {
    const photoEdit = photos.find((photo) => photo.photoID === id);

    photoEdit.description = photo.description;
    photoEdit.place = photo.place;
    photoEdit.updatePhoto = photo.updatePhoto;
    photoEdit.photoName = photo.updatePhoto;

    setLoading(true);
  }

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
    addPhoto,
    removePhoto,
    editPhoto,
    addToFavorites,
    removeFromFavorites,
  };
};

export default usePhotosServices;
