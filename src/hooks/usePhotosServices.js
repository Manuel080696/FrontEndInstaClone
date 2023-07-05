import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PhotoContext } from "../context/PhotosContext";

const usePhotosServices = () => {
  const { favorites, setFavorites } = useContext(AuthContext);
  const { photos, setPhotos } = useContext(PhotoContext);
  const [loading, setLoading] = useState(false);

  console.log(loading);
  const addPhoto = (photo) => {
    setPhotos([photo, ...photos]);
  };

  const removePhoto = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
    setLoading(!loading);
  };

  function editPhoto(photo, id) {
    const photoEdit = photos.find((photo) => photo.photoID === id);

    photoEdit.description = photo.description;
    photoEdit.place = photo.place;
    photoEdit.updatePhoto = photo.updatePhoto;
    photoEdit.photoName = photo.updatePhoto;

    setLoading(!loading);
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
