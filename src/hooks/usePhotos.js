import { useContext, useEffect, useState } from "react";
import { getAllPhotosService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { PhotoContext } from "../context/PhotosContext";

const usePhotos = () => {
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);
  const { photos, setPhotos, setLoading, loading } = useContext(PhotoContext);

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
  }, [setLoading, loading, setPhotos, token]);

  return {
    photos,
    error,
  };
};

export default usePhotos;
