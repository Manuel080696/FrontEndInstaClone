import React from "react";
import { useState } from "react";

export const PhotoContext = React.createContext();

export const PhotoProviderComponent = ({ children }) => {
  const [photos, setPhotos] = useState([]);

  return (
    <PhotoContext.Provider
      value={{
        photos,
        setPhotos,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
