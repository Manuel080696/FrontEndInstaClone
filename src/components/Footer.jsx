import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { useContext } from "react";
import "./Footer.css";
import { AuthContext } from "../context/AuthContext";
import { ModalPhoto } from "./ModalPhoto";
import usePhotosServices from "../hooks/usePhotosServices";

export const Footer = () => {
  const { toggleShow, show } = useContext(AuthContext);
  const { addPhoto } = usePhotosServices();

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
          <ModalPhoto show={show} toggleShow={toggleShow} addPhoto={addPhoto} />
          <img src="/posts.png" onClick={() => toggleShow()} />
        </li>
        <li>
          <Avatar />
        </li>
      </ul>
    </footer>
  );
};
