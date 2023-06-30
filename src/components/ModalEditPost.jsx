import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// import { NewPhoto } from "./NewPhoto";
// import { ModalRegister } from "./ModalRegister";
import "./ModalPhoto.css";
import { EditPost } from "./EditPost";

export const ModalEditPost = ({ photo }) => {
  const { user, showEdit, setShowEdit } = useContext(AuthContext);

  const toggleShowEditPost = () => {
    setShowEdit(!showEdit);
  };

  return (
    <>
      {showEdit && (
        <>
          {user ? (
            <section className="modal-bg">
              <EditPost toggleShowEditPost={toggleShowEditPost} photo={photo} />
            </section>
          ) : (
            ""
            //     <section className="modal-bg">
            //       <section className="modal-fg">
            //         <box-icon
            //           name="x"
            //           color="#ffffff"
            //           onClick={toggleShowEditPost()}
            //         />
            //         <p onClick={toggleShowEditPost()}>
            //           You must register to edit photos :)
            //         </p>
            //         <button id="modalRegister" onClick={openModalRegister}>
            //           Register
            //         </button>
            //       </section>
            //     </section>
          )}
        </>
      )}
      {/* {showRegister && <ModalRegister />} */}
    </>
  );
};
