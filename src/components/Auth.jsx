import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Auth = () => {
  const { user, logOut } = useContext(AuthContext);
  return user ? (
    <section>
      <p>
        Loged in as{" "}
        <Link to={`/user/${user.userData[0].id}`}>
          {user.userData[0].userName}
        </Link>
      </p>
      <button onClick={() => logOut()}>LogOut</button>
    </section>
  ) : (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
};
