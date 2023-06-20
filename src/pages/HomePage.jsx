import { useContext } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { AuthContext } from "../context/AuthContext";
import usePhotos from "../hooks/usePhotos";
import { PhotoList } from "../components/PhotosList";
import { NewPhoto } from "../components/NewPhoto";

export const HomePage = () => {
  const { photos, loading, error, addPhoto, removePhoto } = usePhotos();
  const { user } = useContext(AuthContext);

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
      {/* {user ? <NewPhoto addPhoto={addPhoto} /> : null} */}

      <h1>Latest Photos</h1>

      <PhotoList photos={photos} removePhoto={removePhoto} />
    </section>
  );
};
