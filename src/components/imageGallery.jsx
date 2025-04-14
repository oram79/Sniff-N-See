import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import ImageModal from './ImageModal';
import '../styles/ImageGallery.css';

function ImageGallery({ images, favorites = [], onToggleFavorite }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Open image in modal when clicked
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className='dogbox'>
      <div className="image-gallery">
        {images.map((imageUrl, index) => (
          <div key={`${imageUrl}-${index}`} className="gallery-item">
            <img 
              src={imageUrl} 
              alt={`Dog ${index + 1}`} 
              onClick={() => handleImageClick(imageUrl)}
            />
            <button 
              className="favorite-btn"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(imageUrl);
              }}
              aria-label={favorites.includes(imageUrl) ? "Remove from favorites" : "Add to favorites"}
            >
              {favorites.includes(imageUrl) ? 
                <FaHeart className="favorite-icon active" /> : 
                <FaRegHeart className="favorite-icon" />
              }
            </button>
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageModal 
          imageUrl={selectedImage} 
          onClose={handleCloseModal}
          isFavorite={favorites.includes(selectedImage)}
          onToggleFavorite={() => onToggleFavorite(selectedImage)}
        />
      )}
    </div>
  );
}

export default ImageGallery;