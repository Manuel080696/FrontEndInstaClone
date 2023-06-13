import { Photo } from "./Photo";

export const PhotoList = ({ photos, removePhoto }) => {
  return photos.length ? (
    <ul>
      {photos.map((photo) => (
        <li key={photo.photoID}>
          <Photo photo={photo} removePhoto={removePhoto} />
        </li>
      ))}
    </ul>
  ) : (
    <p>There are no photos yet...</p>
  );
};
