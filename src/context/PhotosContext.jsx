import React from "react";
import { useState } from "react";

export const PhotoContext = React.createContext();

export const PhotoProviderComponent = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);

  return (
    <PhotoContext.Provider
      value={{
        photos,
        setPhotos,
        loading,
        setLoading,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
