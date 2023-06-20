import { ErrorMessage } from "../components/ErrorMessage";
import usePhotos from "../hooks/usePhotos";
import Search from "../components/Search";

export const SearchPage = () => {
  const { loading, error } = usePhotos();

  if (loading) {
    return <p>Cargando photos...</p>;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section>
      <Search />
    </section>
  );
};
