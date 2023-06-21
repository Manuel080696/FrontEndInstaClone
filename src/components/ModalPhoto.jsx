import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import usePhotos from "../hooks/usePhotos";
import { NewPhoto } from "./NewPhoto";
import { ErrorMessage } from "./ErrorMessage";
import "./ModalPhoto.css";
import { useNavigate } from "react-router-dom";

export const ModalPhoto = ({ show, setShow }) => {
  const { loading, error, addPhoto } = usePhotos();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const registroActivo = () => {
    navigate("/register");
    setShow(!show);
  };

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
    show &&
    (user ? (
      <section className="modal-bg">
        <section>
          <NewPhoto addPhoto={addPhoto} setShow={setShow} show={show} />
        </section>
      </section>
    ) : (
      <section className="modal-bg">
        <section className="modal-fg">
          <box-icon name="x" color="#ffffff" onClick={() => setShow(!show)} />
          <p onClick={() => setShow("show")}>
            Debes registarte para poder subir fotos :)
          </p>
          <button onClick={() => registroActivo()}>Register</button>
        </section>
      </section>
    ))
  );
};
