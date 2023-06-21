import { useContext } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { AuthContext } from "../context/AuthContext";
import usePhotos from "../hooks/usePhotos";
import { NewPhoto } from "../components/NewPhoto";
import { Link } from "react-router-dom";
import "./Posts.css";

export const Posts = () => {
  const { loading, error, addPhoto } = usePhotos();
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
    <section className="posts">
      {user ? (
        <NewPhoto addPhoto={addPhoto} />
      ) : (
        <Link to="/login">Debes registarte para poder subir fotos :)</Link>
      )}
    </section>
  );
};
