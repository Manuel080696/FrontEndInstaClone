import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { useState } from "react";
import home from "/home.png";
import search from "/search.png";
import posts from "/posts.png";
import "./Footer.css";

export const Footer = () => {
  const [modal, setModal] = useState(false);
  const Toggle = () => setModal(!modal);

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
          <img src={posts} onClick={() => Toggle()} />
        </li>
        <li>
          <Avatar />
        </li>
      </ul>
    </footer>
  );
};
