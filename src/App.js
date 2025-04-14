import React, { useEffect, useState } from 'react';
import { FaPaw, FaRunning, FaCut, FaHeart, FaBrain } from 'react-icons/fa';
import BreedSelector from './components/breedSelector.jsx';
import ImageGallery from './components/imageGallery.jsx';
import BreedInfo from './components/BreedInfo.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import BreedComparison from './components/BreedComparison.jsx';
import AdvancedFilter from './components/AdvancedFilter.jsx';
import BreedQuiz from './components/BreedQuiz.jsx';
import BreedCareGuide from './components/BreedCareGuide.jsx';
import dogApiService from './services/DogApi.js';
import './App.css';

function App() {
  const [breeds, setBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [imageCount, setImageCount] = useState(1);
  const [fetchedImages, setFetchedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('browse'); // 'browse', 'compare', 'quiz', 'care'
  const [comparisonBreeds, setComparisonBreeds] = useState([]);
  const [showCareGuide, setShowCareGuide] = useState(false);
  
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
        setFilteredBreeds(breedList);
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
  
  // Handle changing tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // If switching to browse, clear any comparison data
    if (tab === 'browse') {
      setComparisonBreeds([]);
    }
  };
  
  // Handle adding a breed to comparison
  const addToComparison = (breed) => {
    // Don't add duplicates
    if (comparisonBreeds.find(b => b.id === breed.toLowerCase())) {
      return;
    }
    
    // For simplicity, we'll use the breed info from our BreedInfo component
    // In a production app, you'd likely have a more robust data source
    const breedData = {
      id: breed.toLowerCase(),
      name: breed.charAt(0).toUpperCase() + breed.slice(1),
      temperament: 'Friendly, Loyal, Playful',
      life_span: '10-14 years',
      weight: 'Medium',
      height: 'Varies by sub-breed',
      group: 'Information not available',
      exercise_needs: 'Medium to High',
      grooming_needs: 'Regular brushing',
      trainability: 'Generally good',
      good_with_children: 'Usually good',
      good_with_other_pets: 'Variable'
    };
    
    setComparisonBreeds(prev => [...prev, breedData]);
    
    // Switch to compare tab
    setActiveTab('compare');
  };
  
  // Handle removing a breed from comparison
  const removeFromComparison = (breedId) => {
    setComparisonBreeds(prev => prev.filter(breed => breed.id !== breedId));
  };
  
  // Handle filters for advanced search
  const handleApplyFilters = (filters) => {
    // This is a simplified filtering mechanism
    // In a real app, you'd have more comprehensive breed data to filter
    if (Object.keys(filters).length === 0) {
      // If no filters, show all breeds
      setFilteredBreeds(breeds);
      return;
    }
    
    // Example filtering logic (very simplified)
    let filtered = [...breeds];
    
    // Size filter
    if (filters.size) {
      switch (filters.size) {
        case 'small':
          filtered = filtered.filter(breed => 
            ['chihuahua', 'pug', 'beagle', 'dachshund', 'corgi'].includes(breed));
          break;
        case 'medium':
          filtered = filtered.filter(breed => 
            ['bulldog', 'boxer', 'collie', 'retriever'].includes(breed));
          break;
        case 'large':
          filtered = filtered.filter(breed => 
            ['shepherd', 'mastiff', 'labrador', 'husky'].includes(breed));
          break;
        case 'xlarge':
          filtered = filtered.filter(breed => 
            ['dane', 'mastiff', 'bernard'].includes(breed));
          break;
        default:
          break;
      }
    }
    
    // This is a simplified implementation
    // In a real app, you'd have more comprehensive filtering
    setFilteredBreeds(filtered);
  };
  
  // Handle breed selection from quiz results
  const handleQuizBreedSelect = (breed) => {
    setSelectedBreed(breed);
    setActiveTab('browse');
    // Optionally, you could automatically fetch images for this breed
  };

  return (
    <div className="mainbox">
      <Header />
      
      <main className="app-content">
        {/* Tab Navigation */}
        <div className="app-tabs">
          <button 
            className={`tab-button ${activeTab === 'browse' ? 'active' : ''}`}
            onClick={() => handleTabChange('browse')}
          >
            Browse Breeds
          </button>
          <button 
            className={`tab-button ${activeTab === 'compare' ? 'active' : ''}`}
            onClick={() => handleTabChange('compare')}
          >
            Compare Breeds
          </button>
          <button 
            className={`tab-button ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => handleTabChange('quiz')}
          >
            Breed Matcher Quiz
          </button>
          <button 
            className={`tab-button ${activeTab === 'care' ? 'active' : ''}`}
            onClick={() => handleTabChange('care')}
          >
            Care Guides
          </button>
        </div>
        
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

        {/* Tab Content */}
        {!loading && !error && activeTab === 'browse' && (
          <>
            <AdvancedFilter onApplyFilters={handleApplyFilters} />
            
            <BreedSelector
              breeds={filteredBreeds}
              selectedBreed={selectedBreed}
              onBreedChange={handleBreedChange}
              imageCount={imageCount}
              onImageCountChange={handleImageCountChange}
              onSubmit={handleSubmit}
              onClearForm={handleClearForm}
            />
            
            {selectedBreed && (
              <>
                <BreedInfo breed={selectedBreed} />
                
                <div className="breed-actions">
                  <button 
                    className="compare-btn"
                    onClick={() => addToComparison(selectedBreed)}
                  >
                    Add to Comparison
                  </button>
                  
                  <button 
                    className="care-guide-btn"
                    onClick={() => {
                      setShowCareGuide(!showCareGuide);
                    }}
                  >
                    {showCareGuide ? 'Hide' : 'Show'} Care Guide
                  </button>
                </div>
                
                {showCareGuide && <BreedCareGuide breed={selectedBreed} />}
              </>
            )}
            
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
        
        {/* Compare Tab */}
        {!loading && !error && activeTab === 'compare' && (
          <>
            <p className="tab-description">
              Select breeds in the Browse tab to add them to your comparison.
            </p>
            <BreedComparison 
              breeds={comparisonBreeds}
              onRemoveBreed={removeFromComparison}
            />
          </>
        )}
        
        {/* Quiz Tab */}
        {!loading && !error && activeTab === 'quiz' && (
          <BreedQuiz onSelectBreed={handleQuizBreedSelect} />
        )}
        
        {/* Care Guides Tab */}
        {!loading && !error && activeTab === 'care' && (
          <>
            <div className="care-guide-selector">
              <label htmlFor="care-breed-select">Select a breed for care information:</label>
              <select 
                id="care-breed-select" 
                value={selectedBreed} 
                onChange={handleBreedChange}
              >
                <option value="">-- Choose a breed --</option>
                {breeds.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed.charAt(0).toUpperCase() + breed.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {selectedBreed && <BreedCareGuide breed={selectedBreed} />}
            
            {!selectedBreed && (
              <div className="care-guide-intro">
                <h3>Dog Care Guides</h3>
                <p>Select a breed from the dropdown above to view detailed care information including nutrition, exercise, grooming, health, and training tips.</p>
                <div className="care-guide-highlights">
                  <div className="care-highlight">
                    <FaPaw className="highlight-icon" />
                    <h4>Nutrition</h4>
                    <p>Proper feeding guidelines specific to the breed's needs</p>
                  </div>
                  <div className="care-highlight">
                    <FaRunning className="highlight-icon" />
                    <h4>Exercise</h4>
                    <p>Activity requirements to keep your dog healthy and happy</p>
                  </div>
                  <div className="care-highlight">
                    <FaCut className="highlight-icon" />
                    <h4>Grooming</h4>
                    <p>Coat care, bathing, and maintenance recommendations</p>
                  </div>
                  <div className="care-highlight">
                    <FaHeart className="highlight-icon" />
                    <h4>Health</h4>
                    <p>Common health concerns and preventative care</p>
                  </div>
                  <div className="care-highlight">
                    <FaBrain className="highlight-icon" />
                    <h4>Training</h4>
                    <p>Effective training approaches for the breed</p>
                  </div>
                </div>
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