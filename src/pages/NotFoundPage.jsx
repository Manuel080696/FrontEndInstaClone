import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export const NotFoundPage = () => {
  return (
    <section className="notFound">
      <header>
        <h1>Not found</h1>
        <p>Our sensors detect nothing...</p>
        <Link to="/">Back to Homer</Link>
      </header>
      <img src="/guerrrera.png" />
    </section>
  );
};
