import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { useState } from "react";
import "./Footer.css";

export const Footer = () => {
  const [modal, setModal] = useState(false);
  const Toggle = () => setModal(!modal);

  return (
    <footer>
      <ul>
        <li>
          <Link to="/">
            <img src="./home.png" />
          </Link>
        </li>
        <li>
          <Link to="/search">
            <img src="./search.png" />
          </Link>
        </li>
        <li>
          <img src="./posts.png" onClick={() => Toggle()} />
        </li>
        <li>
          <Avatar />
        </li>
      </ul>
    </footer>
  );
};
