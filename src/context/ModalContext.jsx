import React, { useState } from "react";

export const ModalContext = React.createContext();

export const ModalProviderComponent = ({ children }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState();
  const [showResetModal, setShowResetModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        showEdit,
        setShowEdit,
        showRegister,
        setShowRegister,
        showResetModal,
        setShowResetModal,
        showLogin,
        setShowLogin,
        show,
        setShow,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
