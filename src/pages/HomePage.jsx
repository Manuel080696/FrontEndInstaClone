import { ErrorMessage } from "../components/ErrorMessage";
import usePhotos from "../hooks/usePhotos";
import { PhotoList } from "../components/PhotosList";

export const HomePage = () => {
  const { photos, loading, error, removePhoto } = usePhotos();

  if (loading) {
    return (
      <aside>
        <img src="./loading.png" />
        <p>Cargando...</p>
      </aside>
    );
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section>
      <PhotoList photos={photos} removePhoto={removePhoto} />
    </section>
  );
};
