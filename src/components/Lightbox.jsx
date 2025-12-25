export default function Lightbox({ image, onClose }) {
    if (!image) return null;
  
    return (
      <div className="lightbox-overlay" onClick={onClose}>
        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
          <button className="lightbox-close" onClick={onClose}>
            X
          </button>
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className="lightbox-image"
          />
          <div className="lightbox-info">
            <h3>{image.user.name}</h3>
            <p>{image.description || image.alt_description}</p>
            <div className="lightbox-stats">
              <span>Likes: {image.likes}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }