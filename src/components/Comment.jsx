export const Comment = ({ comment, user, deleteComment }) => {
  return (
    <article className="comment">
      <section className="header-comment">
        <img
          src={`${import.meta.env.VITE_APP_BACKEND}/uploads/avatar/${
            user.avatar
          }`}
          alt={user.name}
        />
      </section>
      <section className="comment-body">
        <section>
          <p>{comment.userName}</p>

          <p className="comment">{comment.text}</p>
          <p>{new Date(comment.date).toLocaleDateString("es-ES")}</p>
        </section>

        <section>
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
