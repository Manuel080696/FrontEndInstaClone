import { Link } from "react-router-dom";
import { Auth } from "./Auth";
import { SearchInput } from "./SearchInput";

export const Header = () => {
  return (
    <header>
      <h1>
        <Link to="/">Header</Link>
      </h1>
      <nav>
        <Auth />
        <SearchInput />
      </nav>
    </header>
  );
};
