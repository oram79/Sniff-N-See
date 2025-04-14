import React from 'react';
import '../styles/BreedComparison.css';

const BreedComparison = ({ breeds, onRemoveBreed }) => {
  // If no breeds selected for comparison
  if (breeds.length === 0) {
    return (
      <div className="comparison-placeholder">
        <p>Select breeds to compare their characteristics side by side</p>
      </div>
    );
  }

  // Categories for comparison
  const categories = [
    'temperament', 
    'life_span',
    'weight',
    'height',
    'group',
    'exercise_needs',
    'grooming_needs',
    'trainability',
    'good_with_children',
    'good_with_other_pets'
  ];

  // User-friendly category names
  const categoryLabels = {
    temperament: 'Temperament',
    life_span: 'Life Span',
    weight: 'Weight',
    height: 'Height',
    group: 'Group',
    exercise_needs: 'Exercise Needs',
    grooming_needs: 'Grooming Needs',
    trainability: 'Trainability',
    good_with_children: 'Good with Children',
    good_with_other_pets: 'Good with Other Pets'
  };

  return (
    <div className="breed-comparison">
      <h3>Breed Comparison</h3>
      
      <div className="comparison-table">
        <div className="comparison-header">
          <div className="category-column">
            <div className="category-label">Characteristics</div>
          </div>
          {breeds.map((breed, index) => (
            <div key={index} className="breed-column">
              <div className="breed-header">
                <h4>{breed.name}</h4>
                <button 
                  className="remove-breed-btn" 
                  onClick={() => onRemoveBreed(breed.id)}
                  aria-label={`Remove ${breed.name} from comparison`}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="comparison-body">
          {categories.map((category) => (
            <div key={category} className="comparison-row">
              <div className="category-column">
                <div className="category-label">{categoryLabels[category]}</div>
              </div>
              
              {breeds.map((breed, index) => (
                <div key={index} className="breed-column">
                  <div className="breed-value">
                    {breed[category] || 'Data not available'}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreedComparison;