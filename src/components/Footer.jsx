import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { useState } from "react";
import "./Footer.css";
import { ModalPhoto } from "./ModalPhoto";

export const Footer = () => {
  const [show, setShow] = useState(false);

  return (
    <footer>
      <ul>
        <li>
          <Link to="/">
            <img src="/home.png" />
          </Link>
        </li>
        <li>
          <Link to="/search">
            <img src="/search.png" />
          </Link>
        </li>
        <li>
          <ModalPhoto setShow={setShow} show={show} />

          <img src="/posts.png" onClick={() => setShow(!show)} />
        </li>
        <li>
          <Avatar />
        </li>
      </ul>
    </footer>
  );
};
