import React, { useState } from 'react';
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../styles/AdvancedFilter.css';

const AdvancedFilter = ({ onApplyFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    size: '',
    energy: '',
    childFriendly: '',
    petFriendly: '',
    apartmentFriendly: '',
    shedding: '',
    exerciseNeeds: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(filters);
  };

  const handleReset = () => {
    setFilters({
      size: '',
      energy: '',
      childFriendly: '',
      petFriendly: '',
      apartmentFriendly: '',
      shedding: '',
      exerciseNeeds: ''
    });
    onApplyFilters({});
  };

  return (
    <div className="advanced-filter">
      <button 
        className="filter-toggle-btn" 
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="filter-panel"
      >
        <FaFilter /> Advanced Filters
        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      
      {isExpanded && (
        <div id="filter-panel" className="filter-panel">
          <form onSubmit={handleSubmit}>
            <div className="filter-row">
              <div className="filter-group">
                <label htmlFor="size">Size</label>
                <select 
                  id="size" 
                  name="size" 
                  value={filters.size} 
                  onChange={handleFilterChange}
                >
                  <option value="">Any Size</option>
                  <option value="small">Small (0-25 lbs)</option>
                  <option value="medium">Medium (26-60 lbs)</option>
                  <option value="large">Large (61-100 lbs)</option>
                  <option value="xlarge">X-Large (100+ lbs)</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label htmlFor="energy">Energy Level</label>
                <select 
                  id="energy" 
                  name="energy" 
                  value={filters.energy} 
                  onChange={handleFilterChange}
                >
                  <option value="">Any Energy Level</option>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="very-high">Very High</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label htmlFor="childFriendly">Child Friendly</label>
                <select 
                  id="childFriendly" 
                  name="childFriendly" 
                  value={filters.childFriendly} 
                  onChange={handleFilterChange}
                >
                  <option value="">Any</option>
                  <option value="yes">Yes</option>
                  <option value="somewhat">Somewhat</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
            
            <div className="filter-row">
              <div className="filter-group">
                <label htmlFor="petFriendly">Other Pet Friendly</label>
                <select 
                  id="petFriendly" 
                  name="petFriendly" 
                  value={filters.petFriendly} 
                  onChange={handleFilterChange}
                >
                  <option value="">Any</option>
                  <option value="yes">Yes</option>
                  <option value="somewhat">Somewhat</option>
                  <option value="no">No</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label htmlFor="apartmentFriendly">Apartment Friendly</label>
                <select 
                  id="apartmentFriendly" 
                  name="apartmentFriendly" 
                  value={filters.apartmentFriendly} 
                  onChange={handleFilterChange}
                >
                  <option value="">Any</option>
                  <option value="yes">Yes</option>
                  <option value="somewhat">Somewhat</option>
                  <option value="no">No</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label htmlFor="shedding">Shedding Level</label>
                <select 
                  id="shedding" 
                  name="shedding" 
                  value={filters.shedding} 
                  onChange={handleFilterChange}
                >
                  <option value="">Any</option>
                  <option value="minimal">Minimal</option>
                  <option value="moderate">Moderate</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>
            </div>
            
            <div className="filter-row">
              <div className="filter-group">
                <label htmlFor="exerciseNeeds">Exercise Needs</label>
                <select 
                  id="exerciseNeeds" 
                  name="exerciseNeeds" 
                  value={filters.exerciseNeeds} 
                  onChange={handleFilterChange}
                >
                  <option value="">Any</option>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="very-high">Very High</option>
                </select>
              </div>
            </div>
            
            <div className="filter-actions">
              <button type="submit" className="apply-filters-btn">Apply Filters</button>
              <button type="button" className="reset-filters-btn" onClick={handleReset}>Reset</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilter;