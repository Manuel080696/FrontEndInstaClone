import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { useContext } from "react";
import "./Footer.css";
import { AuthContext } from "../context/AuthContext";
import { ModalPhoto } from "./ModalPhoto";
import usePhotos from "../hooks/usePhotos";

export const Footer = () => {
  const { toggleShow, show } = useContext(AuthContext);
  const { addPhoto, loading, error } = usePhotos();

  return (
    <footer>
      <ul>
        <li>
          <Link to="/">
            <img src="/home.png" onClick={() => (show ? toggleShow() : show)} />
          </Link>
        </li>
        <li>
          <Link to="/search">
            <img src="/search.png" />
          </Link>
        </li>
        <li>
          <ModalPhoto
            toggleShow={toggleShow}
            show={show}
            addPhoto={addPhoto}
            loading={loading}
            error={error}
          />
          <img src="/posts.png" onClick={() => toggleShow()} />
        </li>
        <li>
          <Avatar />
        </li>
      </ul>
    </footer>
  );
};
