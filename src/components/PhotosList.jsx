import { PhotoCard } from "./PhotoCard";

export const PhotoList = ({ photos, removePhoto }) => {
  return photos.length ? (
    <ul>
      {photos?.map((photo, index) => (
        <li key={index}>
          <PhotoCard photo={photo} removePhoto={removePhoto} />
        </li>
      ))}
    </ul>
  ) : (
    <p className="photosList-p">There are no photos yet...</p>
  );
};
