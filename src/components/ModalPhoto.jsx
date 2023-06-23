import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NewPhoto } from "./NewPhoto";
import { ErrorMessage } from "./ErrorMessage";
import "./ModalPhoto.css";
import { useNavigate } from "react-router-dom";

export const ModalPhoto = ({ show, toggleShow, addPhoto, loading, error }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const registroActivo = () => {
    navigate("/register");
    toggleShow();
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
          <NewPhoto addPhoto={addPhoto} toggleShow={toggleShow} />
        </section>
      </section>
    ) : (
      <section className="modal-bg">
        <section className="modal-fg">
          <box-icon name="x" color="#ffffff" onClick={() => toggleShow()} />
          <p onClick={() => toggleShow()}>
            Debes registarte para poder subir fotos :)
          </p>
          <button onClick={() => registroActivo()}>Register</button>
        </section>
      </section>
    ))
  );
};
