import { useNavigate } from "react-router-dom";
import "./UserData.css";
export const UserData = ({ photoData }) => {
  const navigate = useNavigate();
  return (
    <section className="user-photos-list">
      <ul>
        {photoData?.map((photo) => (
          <li
            key={photo.photoID}
            onClick={() => navigate(`/photos/${photo.photoID}`)}
          >
            <img
              src={`${import.meta.env.VITE_APP_BACKEND}/uploads/posts/${
                photo.photoName
              }`}
              alt={photo.description}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
