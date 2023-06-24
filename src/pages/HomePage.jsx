import { ErrorMessage } from "../components/ErrorMessage";
import usePhotos from "../hooks/usePhotos";
import { PhotoList } from "../components/PhotosList";
import { Loading } from "../components/Loading";
import "./HomePage.css";

export const HomePage = () => {
  const { photos, loading, error, removePhoto } = usePhotos();

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
