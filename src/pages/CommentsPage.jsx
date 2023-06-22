import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import {
  commentPhotoServices,
  deleteCommentServices,
  getSinglePhotoService,
} from "../services";
import { Comment } from "../components/Comment";
import { LoginPage } from "./LoginPage";

export const CommentsPage = () => {
  const [comments, setComments] = useState();
  const [input, setInput] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, token } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const getComments = async () => {
      try {
        const resultado = await getSinglePhotoService(id);

        setComments(
          resultado.comments.sort((a, b) => {
            return b.id - a.id;
          })
        );
      } catch (error) {
        setError(error.message);
      }
    };

    getComments();
  }, [id]);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const comment = await commentPhotoServices(token, id, input);
      setComments(
        comment.sort((a, b) => {
          return b.id - a.id;
        })
      );
      setInput("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (idComment) => {
    try {
      const totalComment = await deleteCommentServices({
        token,
        id,
        idComment,
      });
      setComments(
        totalComment.sort((a, b) => {
          return b.id - a.id;
        })
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h1>Comentarios</h1>

      {token ? (
        <div>
          <ul>
            {comments?.map((comment) => {
              return (
                <li key={comment.id}>
                  <Comment
                    comment={comment}
                    user={user}
                    deleteComment={deleteComment}
                  />
                </li>
              );
            })}
          </ul>
          <form onSubmit={handleForm}>
            <textarea
              className="textarea-comment"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Comentar como ${user.name}`}
            />
            <button style={{ backgroundColor: "transparent", border: "none" }}>
              <box-icon
                name="send"
                type="solid"
                size="md"
                className="send-btn"
              ></box-icon>
            </button>
            {error ? <p>{error}</p> : null}
          </form>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};
