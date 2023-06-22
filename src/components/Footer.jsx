import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { useState } from "react";
import home from "/home.png";
import search from "/search.png";
import posts from "/posts.png";
import "./Footer.css";
import { ModalPhoto } from "./ModalPhoto";

export const Footer = () => {
  const [show, setShow] = useState(false);

  return (
    <footer>
      <ul>
        <li>
          <Link to="/">
            <img src={home} />
          </Link>
        </li>
        <li>
          <Link to="/search">
            <img src={search} />
          </Link>
        </li>
        <li>
<<<<<<< HEAD
          <img src={posts} onClick={() => Toggle()} />
=======
          <ModalPhoto setShow={setShow} show={show} />

          <img src="./posts.png" onClick={() => setShow(!show)} />
>>>>>>> 9c34ce69386fafb09f693678cbbcf0a83719000c
        </li>
        <li>
          <Avatar />
        </li>
      </ul>
    </footer>
  );
};
