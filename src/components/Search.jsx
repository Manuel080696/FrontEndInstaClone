import usePhotos from "../hooks/usePhotos";

function Search() {
  const { photos } = usePhotos();

  return (
    <div>
      <div>
        {photos.map((photo, index) => (
          <div key={index}>
            <img
              src={`${import.meta.env.VITE_APP_BACKEND}/uploads/posts/${
                photo.photoName
              }`}
              alt="Foto"
            />
            <p>Description: {photo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
