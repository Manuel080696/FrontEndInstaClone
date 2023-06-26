import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { NewPhoto } from "./NewPhoto";
import { ErrorMessage } from "./ErrorMessage";
import { ModalRegister } from "./ModalRegister";
import "./ModalPhoto.css";

export const ModalPhoto = ({ show, toggleShow, addPhoto, loading, error }) => {
  const { user } = useContext(AuthContext);
  const [showModalRegister, setShowModalRegister] = useState(false);

  const openModalRegister = () => {
    toggleShow();
    setShowModalRegister(true);
  };

  const closeModalRegister = () => {
    setShowModalRegister(false);
  };

  if (loading) {
    return (
      <aside>
        <img src="./loading.png" alt="Loading" />
        <p>Cargando...</p>
      </aside>
    );
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      {show && (
        <>
          {user ? (
            <section className="modal-bg">
              <section>
                <NewPhoto addPhoto={addPhoto} toggleShow={toggleShow} />
              </section>
            </section>
          ) : (
            <section className="modal-bg">
              <section className="modal-fg">
                <box-icon name="x" color="#ffffff" onClick={toggleShow} />
                <p onClick={toggleShow}>
                  Debes registrarte para poder subir fotos :)
                </p>
                <button onClick={openModalRegister}>Register</button>
              </section>
            </section>
          )}
        </>
      )}
      {showModalRegister && <ModalRegister toggleShow={closeModalRegister} />}
    </>
  );
};
