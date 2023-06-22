import { ErrorMessage } from "../components/ErrorMessage";
import usePhotos from "../hooks/usePhotos";
import { PhotoList } from "../components/PhotosList";
import { Loading } from "../components/Loading";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ModalPhoto } from "../components/ModalPhoto";
import "./HomePage.css";

export const HomePage = () => {
  const { photos, loading, error, removePhoto, addPhoto } = usePhotos();
  const { toggleShow, show } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="home">
      <ModalPhoto
        toggleShow={toggleShow}
        show={show}
        addPhoto={addPhoto}
        loading={loading}
        error={error}
      />
      <PhotoList photos={photos} removePhoto={removePhoto} />
    </section>
  );
};
