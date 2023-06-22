import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { useContext, useState } from "react";
import "./Footer.css";
import { AuthContext } from "../context/AuthContext";

export const Footer = () => {
  const { toggleShow, show } = useContext(AuthContext);

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
          <img src="/posts.png" onClick={() => toggleShow()} />
        </li>
        <li>
          <Avatar />
        </li>
      </ul>
    </footer>
  );
};
