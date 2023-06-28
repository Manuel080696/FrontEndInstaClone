import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NewPhoto } from "./NewPhoto";
import { ModalRegister } from "./ModalRegister";
import "./ModalPhoto.css";

export const ModalPhoto = ({ show, toggleShow, addPhoto }) => {
  const { user, showRegister, setShowRegister } = useContext(AuthContext);

  const openModalRegister = () => {
    toggleShow();
    setShowRegister(true);
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
                <button id="modalRegister" onClick={openModalRegister}>
                  Register
                </button>
              </section>
            </section>
          )}
        </>
      )}
      {showRegister && <ModalRegister />}
    </>
  );
};
