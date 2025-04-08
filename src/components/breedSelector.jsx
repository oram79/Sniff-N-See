import React, { useState } from 'react';
import { FaUndoAlt } from 'react-icons/fa'; // Add icon for the button

const BreedSelector = ({
  breeds,
  selectedBreed,
  onBreedChange,
  imageCount,
  onImageCountChange,
  onSubmit,
  onClearForm // <-- New prop
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBreeds = breeds.filter(breed =>
    breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <form onSubmit={onSubmit} className="form-section">
      <div className="form-group">
        <label htmlFor="search">Search Breeds:</label>
        <input
          type="text"
          id="search"
          placeholder="e.g., beagle"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="breed">Select Breed:</label>
        <select id="breed" value={selectedBreed} onChange={onBreedChange}>
          <option value="">-- Choose a breed --</option>
          {filteredBreeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed.charAt(0).toUpperCase() + breed.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="count">Number of Images:</label>
        <input
          type="number"
          id="count"
          min="1"
          max="100"
          value={imageCount}
          onChange={onImageCountChange}
        />
      </div>

      <button type="submit">Fetch Dogs 🐶</button>
      <button
        type="button"
        onClick={() => {
          setSearchTerm('');
          onClearForm(); // Clear from App.js
        }}
        style={{ marginTop: '10px', backgroundColor: '#a9a9a9' }}
      >
        <FaUndoAlt style={{ marginRight: '5px' }} /> Clear Fields
      </button>
    </form>
  );
};

export default BreedSelector;
