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
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";

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
          <Box
            sx={{
              py: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <form onSubmit={handleForm}>
              <Textarea
                placeholder={`Comentar como ${user.name}`}
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                sx={{ mb: 1 }}
                color="warning"
              />
              <Button type="submit" color="warning">
                Publicar
              </Button>
            </form>
          </Box>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};
