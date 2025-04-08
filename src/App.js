import React, { useEffect, useState } from 'react';
import BreedSelector from './components/breedSelector.jsx';
import ImageGallery from './components/imageGallery.jsx';

function App() {
  const [breeds, setBreeds] = useState([]); 
  const [selectedBreed, setSelectedBreed] = useState(''); 
  const [imageCount, setImageCount] = useState(1); 
  const [fetchedImages, setFetchedImages] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  // Fetch all breeds
  const fetchBreeds = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      if (!response.ok) throw new Error('Failed to fetch breed list');
      const data = await response.json();
      setBreeds(Object.keys(data.message)); 
    } catch (err) {
      setError('Unable to fetch dog breeds at the moment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  const handleBreedChange = (event) => {
    setSelectedBreed(event.target.value);
  };

  const handleImageCountChange = (event) => {
    setImageCount(parseInt(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedBreed && imageCount > 0 && imageCount <= 100) {
      try {
        setLoading(true);
        setError(null);
        const images = [];
        for (let i = 0; i < imageCount; i++) {
          const imageResponse = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`);
          if (!imageResponse.ok) throw new Error('Failed to fetch image');
          const imageData = await imageResponse.json();
          images.push(imageData.message);
        }
        setFetchedImages(images);
      } catch (err) {
        setError('Error fetching dog images. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('You must select a breed & choose the number of images');
    }
  };

  const handleClearForm = () => {
    setSelectedBreed('');
    setImageCount(1);
    setFetchedImages([]);
  };
  

  return (
    <div className="mainbox">
      <div className='header'>
        <h1>🐾 Sniff & See 🐾</h1>
        <h2>A Place To Find A New Friend :)</h2>
      </div>

      {/* Error Handling */}
      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchBreeds}>Retry</button>
        </div>
      )}

      {/* Loader */}
      {loading && (
        <div className="loader">
          <p>Fetching the good boys and girls... 🐾</p>
        </div>
      )}

      {/* Show Form + Gallery if not loading or error */}
      {!loading && !error && (
        <>
          <BreedSelector
            breeds={breeds}
            selectedBreed={selectedBreed}
            onBreedChange={handleBreedChange}
            imageCount={imageCount}
            onImageCountChange={handleImageCountChange}
            onSubmit={handleSubmit}
            onClearForm={handleClearForm}
          />
          {fetchedImages.length > 0 && <ImageGallery images={fetchedImages} />}
        </>
      )}
    </div>
  );
}

export default App;
