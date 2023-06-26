import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import {
  commentPhotoServices,
  deleteCommentServices,
  getSinglePhotoService,
} from "../services";
import { Comment } from "../components/Comment";

import { ModalLogin } from "../components/ModalLogin";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import { Alert, Stack } from "@mui/joy";

export const CommentsPage = () => {
  const [comments, setComments] = useState();
  const [input, setInput] = useState();
  const [error, setError] = useState("");
  const [, setLoading] = useState(false);
  const { user, token } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const getComments = async () => {
      try {
        const resultado = await getSinglePhotoService(id, token);

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
  }, [id, token]);

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
      <h1>Comments</h1>

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
                placeholder={`Comment like ${user.name}`}
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                sx={{ mb: 1 }}
                color="warning"
              />
              <Button type="submit" color="warning">
                Post
              </Button>
              {error ? (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert
                    variant="outlined"
                    severity="warning"
                    onClose={() => setError("")}
                  >
                    {error}
                  </Alert>
                </Stack>
              ) : null}
            </form>
          </Box>
        </div>
      ) : (
        <ModalLogin />
      )}
    </>
  );
};
