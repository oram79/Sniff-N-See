// Service layer for Dog API interactions
export const dogApiService = {
  // Get all dog breeds
  async getBreeds() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    if (!response.ok) throw new Error('Failed to fetch breed list');
    const data = await response.json();
    return Object.keys(data.message);
  },
  
  // Get sub-breeds for a specific breed (optional feature)
  async getSubBreeds(breed) {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/list`);
    if (!response.ok) throw new Error('Failed to fetch sub-breeds');
    const data = await response.json();
    return data.message;
  },
  
  // Get multiple random images for a breed in one request
  async getBreedImages(breed, count = 1) {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/${count}`);
    if (!response.ok) throw new Error('Failed to fetch images');
    const data = await response.json();
    return data.message;
  }
};

export default dogApiService;