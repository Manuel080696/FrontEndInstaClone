import { Link } from "react-router-dom";
import { Auth } from "./Auth";
import logo from "/logo.png";
import "./Header.css";

export const Header = () => {
  return (
    <header className="home">
      <Link to="/">
        <img src={logo} alt="Logo InstaClone" />
      </Link>
      <nav>
        <Auth />
      </nav>
    </header>
  );
};
