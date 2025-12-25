export default function ImageGrid({ images, onImageClick }) {
    if (!images || images.length === 0) {
      return null;
    }
  
    return (
      <div className="image-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className="image-card"
            onClick={() => onImageClick(image)}
          >
            <img
              src={image.urls.small}
              alt={image.alt_description || 'Unsplash image'}
              loading="lazy"
            />
            <div className="image-overlay">
              <p className="image-author">📷 {image.user.name}</p>
              <p className="image-likes">❤️ {image.likes}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }