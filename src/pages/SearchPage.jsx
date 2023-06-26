import { ErrorMessage } from "../components/ErrorMessage";
import usePhotos from "../hooks/usePhotos";
import Search from "../components/Search";
import { Loading } from "../components/Loading";
import "./AllPage.css";

export const SearchPage = () => {
  const { loading, error } = usePhotos();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="page-Principal picture-back">
      <Search />
    </section>
  );
};
