import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export const NotFoundPage = () => {
  return (
    <section className="notFound">
      <header>
        <h1>Not found</h1>
        <p>Nuestros sensores no detectan nada... </p>
        <Link to="/">Volver a inicio</Link>
      </header>
      <img src="guerrrera.png" />
    </section>
  );
};
