import { useState } from "react";
import { PhotoCard } from "./PhotoCard";

export const PhotoList = ({ photos, removePhoto }) => {
  const [unique] = useState(false);
  return photos.length ? (
    <ul>
      {photos?.map((photo, index) => (
        <li key={index}>
          <PhotoCard photo={photo} removePhoto={removePhoto} unique={unique} />
        </li>
      ))}
    </ul>
  ) : (
    <p>There are no photos yet...</p>
  );
};
