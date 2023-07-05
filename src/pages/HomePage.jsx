import { ErrorMessage } from "../components/ErrorMessage";
import usePhotos from "../hooks/usePhotos";
import { PhotoList } from "../components/PhotosList";
import { Loading } from "../components/Loading";
import "./HomePage.css";
import usePhotosServices from "../hooks/usePhotosServices";

export const HomePage = () => {
  const { photos, loading, error } = usePhotos();
  const { removePhoto } = usePhotosServices();

  if (loading) {
    return <Loading />;
  }
  if (error === "You must login again") {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="home">
      <PhotoList photos={photos} removePhoto={removePhoto} />
    </section>
  );
};
