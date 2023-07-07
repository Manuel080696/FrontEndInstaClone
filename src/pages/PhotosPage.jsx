import { useContext, useEffect, useState } from "react";
import "boxicons";
import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import { AuthContext } from "../context/AuthContext";
import { getSinglePhotoService } from "../services";
import { PhotoCard } from "../components/PhotoCard";
import usePhotosServices from "../hooks/usePhotosServices";
import "./AllPage.css";
import CustomizedSnackbars from "../components/CustomizedSnackbars";

export const PhotosPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);
  const [post, setPost] = useState([]);
  const { removePhoto } = usePhotosServices();

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

  return (
    <>
      <section className="page-Principal juistify picture-back imge">
        <PhotoCard photo={post} removePhoto={removePhoto} />
      </section>
      {error ? (
        <CustomizedSnackbars
          message={"The session has expired, please log in again"}
          severity={"info"}
        />
      ) : null}
    </>
  );
};
