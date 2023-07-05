import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { useContext } from "react";
import "./Footer.css";
import { ModalPhoto } from "./ModalPhoto";
import usePhotosServices from "../hooks/usePhotosServices";
import { ModalContext } from "../context/ModalContext";

export const Footer = () => {
  const { show, setShow } = useContext(ModalContext);
  const { addPhoto } = usePhotosServices();

  const toggleShow = () => {
    setShow(!show);
  };
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
