import usePhotos from "../hooks/usePhotos";
import Search from "../components/Search";
import { Loading } from "../components/Loading";
import { useContext } from "react";
import { PhotoContext } from "../context/PhotosContext";
import "./AllPage.css";
import CustomizedSnackbars from "../components/CustomizedSnackbars";

export const SearchPage = () => {
  const { error } = usePhotos();
  const { loading } = useContext(PhotoContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <section className="page-Principal picture-back">
        <Search />
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
