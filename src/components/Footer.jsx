import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import "./Footer.css";

export const Footer = () => {
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
          <Link to="/photos">
            <img src="./posts.png" />
          </Link>
        </li>
        <li>
          <Avatar />
        </li>
      </ul>
    </footer>
  );
};
