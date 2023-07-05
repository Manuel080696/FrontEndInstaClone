import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProviderComponent } from "./context/AuthContext.jsx";
import { ModalProviderComponent } from "./context/ModalContext.jsx";
import { PhotoProviderComponent } from "./context/PhotosContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProviderComponent>
      <PhotoProviderComponent>
        <ModalProviderComponent>
          <App />
        </ModalProviderComponent>
      </PhotoProviderComponent>
    </AuthProviderComponent>
  </React.StrictMode>
);
