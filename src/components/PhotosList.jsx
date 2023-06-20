import { Photo } from "./Photo";

export const PhotoList = ({ photos, removePhoto }) => {
  return photos.length ? (
    <ul>
      {photos?.map((photo, index) => (
        <li key={index}>
          <Photo photo={photo} removePhoto={removePhoto} />
        </li>
      ))}
    </ul>
  ) : (
    <p>There are no photos yet...</p>
  );
};
