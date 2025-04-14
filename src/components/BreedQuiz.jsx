import React, { useState } from 'react';
import { FaPaw, FaArrowRight, FaRedo } from 'react-icons/fa';
import '../styles/BreedQuiz.css';

// Quiz questions
const quizQuestions = [
  {
    id: 'living_space',
    question: 'What type of living space do you have?',
    options: [
      { value: 'apartment', label: 'Apartment/Condo' },
      { value: 'small_house', label: 'Small house with a yard' },
      { value: 'large_house', label: 'Large house with a big yard' },
      { value: 'farm', label: 'Farm or rural property' }
    ]
  },
  {
    id: 'activity',
    question: 'How active are you?',
    options: [
      { value: 'sedentary', label: 'I prefer to stay indoors' },
      { value: 'moderate', label: 'I enjoy occasional walks' },
      { value: 'active', label: 'I exercise regularly' },
      { value: 'very_active', label: "I'm very active and outdoorsy" }
    ]
  },
  {
    id: 'time',
    question: 'How much time can you dedicate to your dog daily?',
    options: [
      { value: 'little', label: 'Less than 30 minutes' },
      { value: 'moderate', label: '30 minutes to 1 hour' },
      { value: 'significant', label: '1-2 hours' },
      { value: 'unlimited', label: '2+ hours' }
    ]
  },
  {
    id: 'experience',
    question: "What's your experience level with dogs?",
    options: [
      { value: 'first_time', label: 'First-time owner' },
      { value: 'some', label: 'Some experience' },
      { value: 'experienced', label: 'Experienced owner' },
      { value: 'professional', label: 'Professional/breeder' }
    ]
  },
  {
    id: 'children',
    question: 'Do you have children or expect to have them?',
    options: [
      { value: 'no', label: 'No children' },
      { value: 'older', label: 'Yes, older children (8+)' },
      { value: 'young', label: 'Yes, young children' },
      { value: 'babies', label: 'Yes, babies or expecting' }
    ]
  },
  {
    id: 'other_pets',
    question: 'Do you have other pets?',
    options: [
      { value: 'no_pets', label: 'No other pets' },
      { value: 'cats', label: 'Cats' },
      { value: 'dogs', label: 'Other dogs' },
      { value: 'various', label: 'Various pets' }
    ]
  },
  {
    id: 'grooming',
    question: 'How much grooming are you willing to do?',
    options: [
      { value: 'minimal', label: 'Minimal grooming' },
      { value: 'moderate', label: 'Occasional brushing' },
      { value: 'regular', label: 'Regular grooming' },
      { value: 'extensive', label: 'Daily grooming' }
    ]
  },
  {
    id: 'barking',
    question: 'How tolerant are you of barking?',
    options: [
      { value: 'none', label: 'Prefer silent dogs' },
      { value: 'some', label: 'Occasional barking is fine' },
      { value: 'moderate', label: "Moderate barking doesn't bother me" },
      { value: 'any', label: "Barking doesn't bother me at all" }
    ]
  },
  {
    id: 'size',
    question: 'What size dog do you prefer?',
    options: [
      { value: 'tiny', label: 'Tiny (under 10 lbs)' },
      { value: 'small', label: 'Small (10-30 lbs)' },
      { value: 'medium', label: 'Medium (30-60 lbs)' },
      { value: 'large', label: 'Large or Giant (60+ lbs)' }
    ]
  },
  {
    id: 'purpose',
    question: "What's your main purpose for getting a dog?",
    options: [
      { value: 'companion', label: 'Companionship' },
      { value: 'family', label: 'Family pet' },
      { value: 'protection', label: 'Protection/guard dog' },
      { value: 'active', label: 'Activity partner' }
    ]
  }
];

// This is a simplified matching algorithm - in a real app, this would be more sophisticated
const matchBreedsByQuizAnswers = (answers) => {
  // Define breed characteristics based on our quiz answers
  // This is a simplified version - in a real app you'd have a more comprehensive database
  const breedData = {
    beagle: {
      living_space: ['small_house', 'large_house'],
      activity: ['moderate', 'active'],
      time: ['moderate', 'significant'],
      experience: ['some', 'experienced'],
      children: ['older', 'young'],
      other_pets: ['dogs', 'various'],
      grooming: ['minimal', 'moderate'],
      barking: ['some', 'moderate'],
      size: ['small'],
      purpose: ['companion', 'family']
    },
    bulldog: {
      living_space: ['apartment', 'small_house'],
      activity: ['sedentary', 'moderate'],
      time: ['little', 'moderate'],
      experience: ['first_time', 'some'],
      children: ['older', 'young'],
      other_pets: ['no_pets', 'dogs'],
      grooming: ['minimal'],
      barking: ['none', 'some'],
      size: ['medium'],
      purpose: ['companion', 'family']
    },
    chihuahua: {
      living_space: ['apartment', 'small_house'],
      activity: ['sedentary', 'moderate'],
      time: ['little', 'moderate'],
      experience: ['some', 'experienced'],
      children: ['no', 'older'],
      other_pets: ['no_pets', 'dogs'],
      grooming: ['minimal'],
      barking: ['some', 'moderate'],
      size: ['tiny'],
      purpose: ['companion']
    },
    corgi: {
      living_space: ['apartment', 'small_house', 'large_house'],
      activity: ['moderate', 'active'],
      time: ['moderate', 'significant'],
      experience: ['some', 'experienced'],
      children: ['older', 'young'],
      other_pets: ['dogs', 'various'],
      grooming: ['moderate', 'regular'],
      barking: ['some', 'moderate'],
      size: ['small'],
      purpose: ['companion', 'family']
    },
    'german shepherd': {
      living_space: ['small_house', 'large_house'],
      activity: ['active', 'very_active'],
      time: ['significant', 'unlimited'],
      experience: ['experienced', 'professional'],
      children: ['older', 'young'],
      other_pets: ['dogs'],
      grooming: ['moderate', 'regular'],
      barking: ['some', 'moderate'],
      size: ['large'],
      purpose: ['protection', 'active', 'family']
    },
    labrador: {
      living_space: ['small_house', 'large_house'],
      activity: ['moderate', 'active', 'very_active'],
      time: ['moderate', 'significant', 'unlimited'],
      experience: ['first_time', 'some', 'experienced'],
      children: ['older', 'young', 'babies'],
      other_pets: ['dogs', 'cats', 'various'],
      grooming: ['minimal', 'moderate'],
      barking: ['none', 'some'],
      size: ['medium', 'large'],
      purpose: ['companion', 'family', 'active']
    },
    poodle: {
      living_space: ['apartment', 'small_house', 'large_house'],
      activity: ['moderate', 'active'],
      time: ['moderate', 'significant'],
      experience: ['some', 'experienced'],
      children: ['older', 'young'],
      other_pets: ['no_pets', 'dogs', 'cats'],
      grooming: ['regular', 'extensive'],
      barking: ['some'],
      size: ['small', 'medium', 'large'],
      purpose: ['companion', 'family']
    },
    pug: {
      living_space: ['apartment', 'small_house'],
      activity: ['sedentary', 'moderate'],
      time: ['little', 'moderate'],
      experience: ['first_time', 'some'],
      children: ['older', 'young'],
      other_pets: ['dogs', 'cats'],
      grooming: ['minimal'],
      barking: ['none', 'some'],
      size: ['small'],
      purpose: ['companion', 'family']
    },
    'golden retriever': {
      living_space: ['small_house', 'large_house'],
      activity: ['moderate', 'active', 'very_active'],
      time: ['moderate', 'significant', 'unlimited'],
      experience: ['first_time', 'some', 'experienced'],
      children: ['older', 'young', 'babies'],
      other_pets: ['dogs', 'cats', 'various'],
      grooming: ['moderate', 'regular'],
      barking: ['none', 'some'],
      size: ['large'],
      purpose: ['companion', 'family', 'active']
    },
    dachshund: {
      living_space: ['apartment', 'small_house'],
      activity: ['sedentary', 'moderate'],
      time: ['moderate', 'significant'],
      experience: ['some', 'experienced'],
      children: ['older'],
      other_pets: ['no_pets', 'dogs'],
      grooming: ['minimal', 'moderate'],
      barking: ['some', 'moderate'],
      size: ['small'],
      purpose: ['companion', 'family']
    }
  };

  // Calculate match score for each breed
  const breedScores = {};
  
  Object.keys(breedData).forEach(breed => {
    let score = 0;
    let maxPossibleScore = 0;
    
    // For each answer provided, check if it matches the breed's preferences
    Object.keys(answers).forEach(question => {
      if (breedData[breed][question]) {
        maxPossibleScore += 10;
        
        if (breedData[breed][question].includes(answers[question])) {
          score += 10;
        }
      }
    });
    
    // Calculate percentage match
    const matchPercentage = maxPossibleScore > 0 ? Math.round((score / maxPossibleScore) * 100) : 0;
    breedScores[breed] = matchPercentage;
  });
  
  // Sort breeds by score (highest first) and get top matches
  const sortedBreeds = Object.entries(breedScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([breed, score]) => ({
      breed: breed.charAt(0).toUpperCase() + breed.slice(1),
      score
    }));
  
  return sortedBreeds;
};

const BreedQuiz = ({ onSelectBreed }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleAnswer = (value) => {
    // Save the answer
    setAnswers(prev => ({
      ...prev,
      [quizQuestions[currentQuestionIndex].id]: value
    }));
    
    // Move to the next question or finish the quiz
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // All questions answered, calculate results
      const matchResults = matchBreedsByQuizAnswers(answers);
      setResults(matchResults);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResults(null);
  };

  // Current question
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  if (!showQuiz) {
    return (
      <div className="breed-quiz-intro">
        <h3>Find Your Perfect Dog Breed Match</h3>
        <p>Answer 10 simple questions about your lifestyle and preferences to discover which dog breeds might be the best fit for you!</p>
        <button 
          className="start-quiz-btn" 
          onClick={() => setShowQuiz(true)}
        >
          <FaPaw /> Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="breed-quiz">
      {!results ? (
        // Quiz questions
        <>
          <div className="quiz-progress">
            <div 
              className="progress-bar" 
              style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
            ></div>
          </div>
          <div className="question-counter">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </div>
          
          <h3>{currentQuestion.question}</h3>
          
          <div className="options-container">
            {currentQuestion.options.map((option) => (
              <button 
                key={option.value}
                className="option-btn"
                onClick={() => handleAnswer(option.value)}
              >
                {option.label}
                <FaArrowRight className="arrow-icon" />
              </button>
            ))}
          </div>
        </>
      ) : (
        // Results display
        <div className="quiz-results">
          <h3>Your Top Dog Breed Matches</h3>
          <p className="results-intro">Based on your lifestyle and preferences, here are your top matches:</p>
          
          <div className="match-results">
            {results.map((result, index) => (
              <div key={index} className="match-item">
                <div className="match-rank">{index + 1}</div>
                <div className="match-details">
                  <h4 className="match-breed">{result.breed}</h4>
                  <div className="match-score-container">
                    <div 
                      className="match-score-bar" 
                      style={{ width: `${result.score}%` }}
                    ></div>
                    <span className="match-percentage">{result.score}% Match</span>
                  </div>
                </div>
                <button 
                  className="view-breed-btn"
                  onClick={() => onSelectBreed(result.breed.toLowerCase())}
                >
                  View Breed
                </button>
              </div>
            ))}
          </div>
          
          <button 
            className="restart-quiz-btn"
            onClick={handleRestartQuiz}
          >
            <FaRedo /> Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default BreedQuiz;