import { useState } from "react";
import { recoverUserServices } from "../services";
import { Alert, Stack } from "@mui/joy";
import "./ModalLogin.css";

export const ModalRecover = ({
  showRecoverModal,
  setShowRecoverModal,
  setShowResetModal,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await recoverUserServices({ email });
      setShowRecoverModal(false);
      setShowResetModal(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const closeModal = () => {
    setShowRecoverModal(false);
  };

  return (
    <>
      {showRecoverModal && (
        <section className="modal-bg">
          <section className="modal-fg login">
            <box-icon name="x" color="#ffffff" onClick={closeModal} />
            <h2>Recover Password</h2>
            <p>Enter your email to be able to send you a recovery code</p>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email..."
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </fieldset>
              <button id="btnTitle">Send</button>
            </form>
            <p className="error">
              {error ? (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="warning" onClose={() => setError("")}>
                    {error}
                  </Alert>
                </Stack>
              ) : null}
            </p>
          </section>
          <img id="robotDuda" src="/c.webp" alt="Robot con duda" />
        </section>
      )}
    </>
  );
};
