import { useContext, useEffect, useState } from "react";
import { getAllPhotosService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { PhotoContext } from "../context/PhotosContext";

const usePhotos = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);
  const { photos, setPhotos } = useContext(PhotoContext);

  console.log("usePhotos");
  //Photos general
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        console.log("getAllPhotosService");
        const data = await getAllPhotosService(token);

        setPhotos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, [setLoading, setPhotos, token]);

  return {
    photos,
    loading,
    error,
  };
};

export default usePhotos;
