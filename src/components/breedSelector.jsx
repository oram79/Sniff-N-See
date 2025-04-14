import React, { useState } from 'react';
import { FaUndoAlt, FaSearch, FaDog } from 'react-icons/fa';
import '../styles/BreedSelector.css';

const BreedSelector = ({
  breeds,
  selectedBreed,
  onBreedChange,
  imageCount,
  onImageCountChange,
  onSubmit,
  onClearForm
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBreeds = breeds.filter(breed =>
    breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClear = () => {
    setSearchTerm('');
    onClearForm();
  };

  return (
    <form onSubmit={onSubmit} className="form-section">
      <div className="form-group">
        <label htmlFor="search">
          <FaSearch style={{ marginRight: '5px' }} />
          Search Breeds:
        </label>
        <input
          type="text"
          id="search"
          placeholder="e.g., beagle, poodle, boxer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search for dog breeds"
        />
      </div>

      <div className="form-group">
        <label htmlFor="breed">
          <FaDog style={{ marginRight: '5px' }} />
          Select Breed:
        </label>
        <select 
          id="breed" 
          value={selectedBreed} 
          onChange={onBreedChange}
          aria-label="Select a dog breed"
        >
          <option value="">-- Choose a breed --</option>
          {filteredBreeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed.charAt(0).toUpperCase() + breed.slice(1)}
            </option>
          ))}
        </select>
        {filteredBreeds.length === 0 && searchTerm && (
          <p className="no-results">No breeds match your search</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="count">Number of Images (1-10):</label>
        <input
          type="number"
          id="count"
          min="1"
          max="10"
          value={imageCount}
          onChange={onImageCountChange}
          aria-label="Number of images to fetch"
        />
      </div>

      <div className="form-buttons">
        <button 
          type="submit"
          disabled={!selectedBreed || imageCount < 1 || imageCount > 10}
          aria-label="Fetch dog images"
        >
          <FaDog /> Fetch Dogs
        </button>
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear form fields"
        >
          <FaUndoAlt /> Clear Fields
        </button>
      </div>
    </form>
  );
};

export default BreedSelector;