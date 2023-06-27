import { useContext, useEffect, useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";

import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import "boxicons";
import { AuthContext } from "../context/AuthContext";
import { getSinglePhotoService } from "../services";
import usePhotos from "../hooks/usePhotos";
import { PhotoCard } from "../components/PhotoCard";
import "./AllPage.css";

export const PhotosPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);
  const [post, setPost] = useState([]);
  const { removePhoto } = usePhotos();
  const [unique, setUnique] = useState(true);

  useEffect(() => {
    const loadPhoto = async () => {
      try {
        const data = await getSinglePhotoService(id, token);
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadPhoto();
  }, [id, token]);

  // Cuando se está cargando
  if (loading) {
    return <Loading />;
  }
  // Porsi ocurre algún error
  if (error) {
    return <ErrorMessage message={error} />;
  }
  return (
    <section className="page-Principal juistify picture-back imge">
      {console.log([post].length)}
      <PhotoCard photo={post} removePhoto={removePhoto} unique={unique} />
    </section>
  );
};
