import { Link } from "react-router-dom";
import { useUserData } from "../hooks/userData";

export const Comment = ({ comment, user, deleteComment }) => {
  const { avatar, nullRute } = useUserData();
  return (
    <article className="comment">
      <section className="header-comment">
        <Link to={`/user/${user.id}`}>
          <img src={avatar !== nullRute ? avatar : "/avatarDefault.png"} />
        </Link>
      </section>
      <section className="comment-body">
        <section className="comment-content">
          <span>
            <h3 className="comment-body-userName">{comment.userName}</h3>
            <p className="comment-body-date">
              {new Date(comment.date).toLocaleDateString("es-ES")}
            </p>
          </span>

          <p className="comment-body-text">{comment.text}</p>
        </section>

        <section className="comment-body-delete">
          <button
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={() => {
              if (window.confirm("Are you sure?")) deleteComment(comment.id);
            }}
          >
            <box-icon type="solid" name="trash"></box-icon>
          </button>
        </section>
      </section>
    </article>
  );
};
