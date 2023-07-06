import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./ModalEditPost.css";
import { EditPost } from "./EditPost";
import { ModalContext } from "../context/ModalContext";

export const ModalEditPost = ({ photo, setShowEditPost }) => {
  const { user } = useContext(AuthContext);
  const { setShowEdit, setShowLogin } = useContext(ModalContext);

  const handleEditLogin = () => {
    setShowEdit(false);
    setShowEditPost(false);
    setShowLogin(true);
  };

  const toggle = () => {
    setShowEdit(false);
    setShowEditPost(false);
  };

  return user ? (
    <section className="modal-bg-EditPhoto">
      <EditPost
        photo={photo}
        setShowEditPost={setShowEditPost}
        className="modal-fg-EditPhoto"
      />
    </section>
  ) : (
    <section className="modal-bg-EditPhoto">
      <section className="modal-fg login">
        <box-icon name="x" onClick={toggle} />
        <p>You must login to edit photos :</p>
        <button id="modalRegister" onClick={handleEditLogin}>
          Login
        </button>
      </section>
    </section>
  );
};
