import React, { useEffect, useState } from 'react';
import BreedSelector from './components/breedSelector.jsx';  // Fixed path but kept PascalCase for component
import ImageGallery from './components/imageGallery.jsx';    // Fixed path but kept PascalCase for component
import BreedInfo from './components/BreedInfo.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import dogApiService from './services/DogApi.js';
import './App.css';

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [imageCount, setImageCount] = useState(1);
  const [fetchedImages, setFetchedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from localStorage
    const saved = localStorage.getItem('dogFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch all breeds using the service layer
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoading(true);
        setError(null);
        const breedList = await dogApiService.getBreeds();
        setBreeds(breedList);
      } catch (err) {
        setError('Unable to fetch dog breeds at the moment. Please try again.');
      } finally {
        setLoading(false);
      }
    };

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
    if (selectedBreed && imageCount > 0 && imageCount <= 10) {
      try {
        setLoading(true);
        setError(null);
        // Use the service layer to get multiple images in one request
        const images = await dogApiService.getBreedImages(selectedBreed, imageCount);
        setFetchedImages(images);
      } catch (err) {
        setError('Error fetching dog images. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('You must select a breed & choose the number of images (1-10)');
    }
  };

  const handleClearForm = () => {
    setSelectedBreed('');
    setImageCount(1);
    setFetchedImages([]);
  };
  
  const toggleFavorite = (imageUrl) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.includes(imageUrl)
        ? prevFavorites.filter(url => url !== imageUrl)
        : [...prevFavorites, imageUrl];
      
      // Save to localStorage
      localStorage.setItem('dogFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className="mainbox">
      <Header />
      
      <main className="app-content">
        {/* Error Handling */}
        {error && (
          <div className="error">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}

        {/* Loader */}
        {loading && (
          <div className="loader">
            <p>Fetching the good boys and girls... 🐾</p>
            <div className="skeleton-gallery">
              {[...Array(imageCount || 3)].map((_, i) => (
                <div key={i} className="skeleton-item skeleton"></div>
              ))}
            </div>
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
            
            {selectedBreed && <BreedInfo breed={selectedBreed} />}
            
            {fetchedImages.length > 0 && (
              <ImageGallery 
                images={fetchedImages} 
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            )}
            
            {favorites.length > 0 && (
              <div className="favorites-section">
                <h3>Your Favorite Dogs</h3>
                <ImageGallery 
                  images={favorites} 
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;