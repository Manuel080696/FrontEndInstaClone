import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { PhotoContext } from "../context/PhotosContext";

const usePhotosServices = () => {
  const { favorites, setFavorites } = useContext(AuthContext);
  const { photos, setPhotos, setLoading } = useContext(PhotoContext);

  const addPhoto = (photo) => {
    setPhotos([photo, ...photos]);
  };

  const removePhoto = (id) => {
    setLoading(true);
    setPhotos(photos.filter((photo) => photo.id !== id));
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
