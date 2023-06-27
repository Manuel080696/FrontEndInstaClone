import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { NewPhoto } from "./NewPhoto";
import { ModalRegister } from "./ModalRegister";
import "./ModalPhoto.css";

export const ModalPhoto = ({ show, toggleShow, addPhoto }) => {
  const { user } = useContext(AuthContext);
  const [showModalRegister, setShowModalRegister] = useState(false);

  const openModalRegister = () => {
    toggleShow();
    setShowModalRegister(true);
  };

  const closeModalRegister = () => {
    setShowModalRegister(false);
  };

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
                  You must register to upload photos :)
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
