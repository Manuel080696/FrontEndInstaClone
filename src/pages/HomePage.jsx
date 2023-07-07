import usePhotos from "../hooks/usePhotos";
import { PhotoList } from "../components/PhotosList";
import { Loading } from "../components/Loading";
import "./HomePage.css";
import usePhotosServices from "../hooks/usePhotosServices";
import { useContext } from "react";
import { PhotoContext } from "../context/PhotosContext";
// import { AuthContext } from "../context/AuthContext";
import CustomizedSnackbars from "../components/CustomizedSnackbars";

export const HomePage = () => {
  const { photos, error } = usePhotos();
  const { removePhoto } = usePhotosServices();
  const { loading } = useContext(PhotoContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <section className="home">
        <PhotoList photos={photos} removePhoto={removePhoto} />
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
