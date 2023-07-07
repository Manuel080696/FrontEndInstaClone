import { useState } from "react";
import { resetUserServices } from "../services";

import "./ModalReset.css";
import { Alert, Stack } from "@mui/joy";

export const ModalReset = ({ setShowResetModal }) => {
  const [recoverCode, setRecoverCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [send, setSend] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await resetUserServices({ recoverCode, newPassword });
      setSend(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const closeModal = () => {
    setShowResetModal(false);
  };

  return (
    <>
      <section className="modal-bg">
        <section className="modal-fg login">
          <box-icon name="x" color="#ffffff" onClick={closeModal} />
          <h1>Reset Password</h1>
          <p>Enter the recovery code and the new password</p>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <input
                type="text"
                id="recover-code"
                name="recover-code"
                placeholder="recover-code"
                onChange={(e) => setRecoverCode(e.target.value)}
                required
              />
            </fieldset>
            <fieldset>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </fieldset>
            <button id="btnTitle">Send</button>
          </form>
          <p>
            {error ? (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="warning" onClose={() => setError("")}>
                  {error}
                </Alert>
              </Stack>
            ) : null}
          </p>
          <section>
            {send ? (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="success" onClose={() => setSend("")}>
                  {send}
                </Alert>
              </Stack>
            ) : null}
          </section>
        </section>
      </section>
    </>
  );
};
