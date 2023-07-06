import { ErrorMessage } from "../components/ErrorMessage";
import usePhotos from "../hooks/usePhotos";
import { PhotoList } from "../components/PhotosList";
import { Loading } from "../components/Loading";
import "./HomePage.css";
import usePhotosServices from "../hooks/usePhotosServices";
import { useContext } from "react";
import { PhotoContext } from "../context/PhotosContext";

export const HomePage = () => {
  const { photos, error } = usePhotos();
  const { removePhoto } = usePhotosServices();
  const { loading } = useContext(PhotoContext);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="home">
      <PhotoList photos={photos} removePhoto={removePhoto} />
    </section>
  );
};
