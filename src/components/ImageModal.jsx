import React from 'react';
import { FaHeart, FaRegHeart, FaTimes, FaDownload } from 'react-icons/fa';
import '../styles/ImageModal.css';

const ImageModal = ({ imageUrl, onClose, isFavorite, onToggleFavorite }) => {
  // Close when clicking outside the image
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Download the image
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    // Extract breed name from URL for the filename
    const urlParts = imageUrl.split('/');
    const breedPart = urlParts.find(part => part.includes('breeds'));
    const breedIndex = urlParts.indexOf(breedPart);
    const breed = urlParts[breedIndex + 1] || 'dog';
    
    link.download = `${breed}-dog.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Prevent the modal from closing when clicking inside
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="image-modal-backdrop" onClick={handleBackdropClick}>
      <div className="image-modal-content" onClick={handleModalClick}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close image">
          <FaTimes />
        </button>
        <img src={imageUrl} alt="Enlarged dog" />
        <div className="modal-actions">
          <button 
            className="modal-action-btn favorite-btn"
            onClick={onToggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <>
                <FaHeart className="favorite-icon active" /> 
                <span>Remove from Favorites</span>
              </>
            ) : (
              <>
                <FaRegHeart className="favorite-icon" /> 
                <span>Add to Favorites</span>
              </>
            )}
          </button>
          <button 
            className="modal-action-btn download-btn"
            onClick={handleDownload}
            aria-label="Download image"
          >
            <FaDownload className="download-icon" /> 
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;