import { Link } from "react-router-dom";
import { Auth } from "./Auth";
import "./Header.css";

export const Header = () => {
  return (
    <header className="home">
      <Link to="/">
        <img src="/logo.png" alt="Logo InstaClone" />
      </Link>
      <nav>
        <Auth />
      </nav>
    </header>
  );
};
