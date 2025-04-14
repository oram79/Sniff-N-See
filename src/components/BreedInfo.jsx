import React, { useState, useEffect } from 'react';
import '../styles/BreedInfo.css';

// This component displays information about the selected breed
const BreedInfo = ({ breed }) => {
  const [breedData, setBreedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Breed characteristics data - in a real app, this would come from an API
  const breedCharacteristics = {
    affenpinscher: {
      temperament: 'Confident, Famously Funny, Fearless',
      life_span: '12-14 years',
      weight: '7-10 pounds',
      height: '9-11.5 inches',
      group: 'Toy Group'
    },
    beagle: {
      temperament: 'Friendly, Curious, Merry',
      life_span: '10-15 years',
      weight: '20-30 pounds',
      height: '13-15 inches',
      group: 'Hound Group'
    },
    boxer: {
      temperament: 'Bright, Fun-loving, Active',
      life_span: '10-12 years',
      weight: '50-70 pounds',
      height: '21.5-25 inches',
      group: 'Working Group'
    },
    bulldog: {
      temperament: 'Friendly, Courageous, Calm',
      life_span: '8-10 years',
      weight: '40-50 pounds',
      height: '14-15 inches',
      group: 'Non-Sporting Group'
    },
    chihuahua: {
      temperament: 'Charming, Graceful, Sassy',
      life_span: '14-16 years',
      weight: '2-6 pounds',
      height: '5-8 inches',
      group: 'Toy Group'
    },
    corgi: {
      temperament: 'Affectionate, Smart, Alert',
      life_span: '12-13 years',
      weight: '27-30 pounds',
      height: '10-12 inches',
      group: 'Herding Group'
    },
    dachshund: {
      temperament: 'Spunky, Curious, Friendly',
      life_span: '12-16 years',
      weight: '16-32 pounds',
      height: '8-9 inches',
      group: 'Hound Group'
    },
    german: {
      temperament: 'Confident, Courageous, Smart',
      life_span: '7-10 years',
      weight: '50-90 pounds',
      height: '22-26 inches',
      group: 'Herding Group'
    },
    golden: {
      temperament: 'Friendly, Intelligent, Devoted',
      life_span: '10-12 years',
      weight: '55-75 pounds',
      height: '21.5-24 inches',
      group: 'Sporting Group'
    },
    labrador: {
      temperament: 'Friendly, Active, Outgoing',
      life_span: '10-12 years',
      weight: '55-80 pounds',
      height: '21.5-24.5 inches',
      group: 'Sporting Group'
    },
    poodle: {
      temperament: 'Active, Proud, Very Smart',
      life_span: '10-18 years',
      weight: '40-70 pounds',
      height: '15-22 inches',
      group: 'Non-Sporting Group'
    },
    pug: {
      temperament: 'Charming, Mischievous, Loving',
      life_span: '13-15 years',
      weight: '14-18 pounds',
      height: '10-13 inches',
      group: 'Toy Group'
    },
    retriever: {
      temperament: 'Friendly, Intelligent, Devoted',
      life_span: '10-12 years',
      weight: '55-75 pounds',
      height: '21.5-24 inches',
      group: 'Sporting Group'
    },
    shepherd: {
      temperament: 'Confident, Courageous, Smart',
      life_span: '7-10 years',
      weight: '50-90 pounds',
      height: '22-26 inches',
      group: 'Herding Group'
    }
  };

  useEffect(() => {
    const fetchBreedInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First, check if we have data for this breed in our local dataset
        if (breedCharacteristics[breed]) {
          setBreedData({
            name: breed.charAt(0).toUpperCase() + breed.slice(1),
            ...breedCharacteristics[breed]
          });
        } else {
          // This is a simplified approach. For a real app, you would want to
          // fetch from a real dog API with more complete data.
          // Just creating a placeholder for breeds we don't have specific data for
          setBreedData({
            name: breed.charAt(0).toUpperCase() + breed.slice(1),
            temperament: 'Friendly, Loyal, Playful',
            life_span: '10-14 years',
            weight: 'Varies by sub-breed',
            height: 'Varies by sub-breed',
            group: 'Information not available'
          });
        }
      } catch (err) {
        setError('Could not fetch breed information');
      } finally {
        setLoading(false);
      }
    };

    if (breed) {
      fetchBreedInfo();
    }
  }, [breed]);

  if (loading) return <div className="breed-info loading">Loading breed information...</div>;
  if (error) return <div className="breed-info error">{error}</div>;
  if (!breedData) return null;

  return (
    <div className="breed-info">
      <h3>{breedData.name} Information</h3>
      <div className="breed-info-content">
        <div className="breed-info-item">
          <span className="info-label">Temperament:</span>
          <span className="info-value">{breedData.temperament}</span>
        </div>
        <div className="breed-info-item">
          <span className="info-label">Life Span:</span>
          <span className="info-value">{breedData.life_span}</span>
        </div>
        <div className="breed-info-item">
          <span className="info-label">Weight:</span>
          <span className="info-value">{breedData.weight}</span>
        </div>
        <div className="breed-info-item">
          <span className="info-label">Height:</span>
          <span className="info-value">{breedData.height}</span>
        </div>
        <div className="breed-info-item">
          <span className="info-label">Group:</span>
          <span className="info-value">{breedData.group}</span>
        </div>
      </div>
      <p className="breed-info-note">Note: Information is for general reference only.</p>
    </div>
  );
};

export default BreedInfo;