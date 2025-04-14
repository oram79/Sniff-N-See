import React, { useState } from 'react';
import { 
  FaPaw, 
  FaBone, 
  FaRunning, 
  FaHeart, 
  FaClipboardCheck, 
  FaBrain,
  FaCut,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import '../styles/BreedCareGuide.css';

const BreedCareGuide = ({ breed }) => {
  const [activeTab, setActiveTab] = useState('nutrition');
  const [expandedSections, setExpandedSections] = useState({
    nutrition: true,
    exercise: false,
    grooming: false,
    health: false,
    training: false
  });

  // This would typically come from an API or a more comprehensive database
  // For the demo, we'll include sample data for a few breeds
  const careGuides = {
    beagle: {
      nutrition: {
        title: "Nutrition for Beagles",
        description: "Beagles have hearty appetites and can be prone to obesity. A balanced diet is crucial for their health and longevity.",
        details: [
          {
            title: "Daily Caloric Needs",
            content: "Adult Beagles typically need about 700-1,000 calories per day, depending on their activity level, age, and size."
          },
          {
            title: "Feeding Schedule",
            content: "Feed adult Beagles twice a day—morning and evening—to help prevent bloat. Puppies require more frequent feeding, about 3-4 times daily."
          },
          {
            title: "Recommended Diet",
            content: "High-quality dog food with animal protein as the first ingredient. Look for foods with controlled fat content to prevent weight gain. Avoid foods with excessive fillers like corn and wheat."
          },
          {
            title: "Special Considerations",
            content: "Beagles are notorious for their tendency to overeat. Measure food carefully and limit treats to 10% of daily caloric intake. Keep food stored securely as Beagles will go to great lengths to access it!"
          }
        ]
      },
      exercise: {
        title: "Exercise for Beagles",
        description: "Originally bred as hunting dogs, Beagles have high energy levels and need regular exercise to stay healthy and prevent behavioral problems.",
        details: [
          {
            title: "Exercise Requirements",
            content: "Beagles need at least 60-90 minutes of physical activity daily. This should include walks and more vigorous activities like running, playing fetch, or agility training."
          },
          {
            title: "Types of Exercise",
            content: "Varied activities are best: leashed walks (Beagles will follow their nose if unleashed!), backyard play, scent games that engage their powerful nose, and interactive toys that stimulate them mentally."
          },
          {
            title: "Exercise Cautions",
            content: "Always exercise Beagles in secure areas as they can follow scents and ignore recalls. Avoid exercising in extreme heat as their short noses make them susceptible to overheating."
          },
          {
            title: "Mental Stimulation",
            content: "Beagles need mental as well as physical exercise. Use puzzle toys, hide treats for them to find, or create obstacle courses to keep their minds engaged."
          }
        ]
      },
      grooming: {
        title: "Grooming Your Beagle",
        description: "Beagles have a short double coat that requires moderate grooming to stay healthy and minimize shedding.",
        details: [
          {
            title: "Brushing",
            content: "Brush your Beagle weekly with a medium-bristle brush or rubber grooming mitt to remove loose hair and distribute skin oils. During seasonal shedding periods (spring and fall), daily brushing may be necessary."
          },
          {
            title: "Bathing",
            content: "Bathe a Beagle once every 4-6 weeks or when they get particularly dirty. Use a gentle dog shampoo to avoid drying out their skin. Their natural oils help protect their coat, so avoid over-bathing."
          },
          {
            title: "Ear Care",
            content: "With their floppy ears, Beagles are prone to ear infections. Check and clean ears weekly with a veterinarian-recommended solution. Look for redness, odor, or discharge that might indicate an infection."
          },
          {
            title: "Nail Care",
            content: "Trim nails every 3-4 weeks. If you can hear the nails clicking on the floor, they're too long. Be careful not to cut into the quick (the pink area visible in light-colored nails)."
          },
          {
            title: "Dental Care",
            content: "Brush teeth 2-3 times weekly with dog-specific toothpaste to prevent dental disease. Dental chews can supplement brushing but aren't a replacement for it."
          }
        ]
      },
      health: {
        title: "Beagle Health Concerns",
        description: "While generally healthy, Beagles are predisposed to certain health conditions that owners should be aware of.",
        details: [
          {
            title: "Common Health Issues",
            content: "Obesity, ear infections, hypothyroidism, epilepsy, cherry eye, intervertebral disc disease, allergies, and certain inherited conditions like factor VII deficiency."
          },
          {
            title: "Preventative Care",
            content: "Regular veterinary check-ups (at least annually for adults, twice yearly for seniors), keeping vaccinations current, monthly heartworm preventative, and flea/tick control."
          },
          {
            title: "Weight Management",
            content: "Obesity is a serious concern in Beagles and can lead to or worsen other health problems. Monitor weight regularly and adjust food accordingly. An adult Beagle should have a visible waist when viewed from above."
          },
          {
            title: "Dental Health",
            content: "Dental disease is common in Beagles. In addition to regular brushing, professional dental cleanings may be necessary periodically."
          },
          {
            title: "Senior Care",
            content: "As Beagles age (around 7+ years), they may develop age-related conditions like arthritis or cognitive decline. Consider joint supplements and more frequent veterinary check-ups for seniors."
          }
        ]
      },
      training: {
        title: "Training Your Beagle",
        description: "Beagles are intelligent but can be stubborn. Consistent, positive reinforcement training is essential for a well-behaved companion.",
        details: [
          {
            title: "Basic Approach",
            content: "Use positive reinforcement with high-value treats. Beagles are food-motivated, which can aid training. Sessions should be short (5-10 minutes) but frequent to accommodate their shorter attention spans."
          },
          {
            title: "Socialization",
            content: "Early socialization is crucial. Expose Beagle puppies to various people, animals, environments, and situations to prevent fearfulness and encourage adaptability."
          },
          {
            title: "Recall Training",
            content: "Due to their hunting instincts, Beagles can be challenging to call back when they're following a scent. Practice recall in enclosed areas with increasing distractions, and never let them off-leash in unsecured areas."
          },
          {
            title: "Scent Work",
            content: "Channel their natural abilities with scent games or nosework training. This provides mental stimulation and can strengthen your bond."
          },
          {
            title: "Barking and Howling",
            content: "Beagles are vocal dogs. Teach a 'quiet' command early on. Don't reward vocalization with attention, even negative attention."
          },
          {
            title: "Crate Training",
            content: "Beagles benefit from proper crate training. It provides them with a safe space and aids in housebreaking. The crate should be large enough for them to stand, turn around, and lie down comfortably."
          }
        ]
      }
    },
    labrador: {
      nutrition: {
        title: "Nutrition for Labradors",
        description: "Labradors have big appetites and are prone to obesity. Careful attention to their diet is essential for their health.",
        details: [
          {
            title: "Daily Caloric Needs",
            content: "Adult Labs typically need about 1,000-1,800 calories per day, depending on their activity level, age, and size."
          },
          {
            title: "Feeding Schedule",
            content: "Feed adult Labradors twice a day to prevent bloat. Puppies require 3-4 meals daily until 6 months of age."
          },
          {
            title: "Recommended Diet",
            content: "High-quality dog food with appropriate protein levels (at least 20% for adults). Look for foods with controlled fat content to prevent weight gain. Fish oil supplements can benefit coat health."
          },
          {
            title: "Special Considerations",
            content: "Labs are notorious for eating anything they can get - monitor portions carefully and keep food stored securely. They're prone to food allergies, so watch for signs like itchy skin or ear infections."
          }
        ]
      },
      exercise: {
        title: "Exercise for Labradors",
        description: "Labradors are energetic, athletic dogs that need plenty of exercise to stay happy and healthy.",
        details: [
          {
            title: "Exercise Requirements",
            content: "Labs need at least 60-90 minutes of physical activity daily, including walks and more vigorous activities."
          },
          {
            title: "Types of Exercise",
            content: "Swimming is excellent for Labs as it's low-impact on joints but provides great exercise. Fetch, hiking, and running make great activities too. Mix up routines to keep them engaged."
          },
          {
            title: "Exercise Cautions",
            content: "Don't over-exercise puppies - follow the five-minute rule (5 minutes per month of age, twice daily). Be cautious exercising in heat as Labs can overheat, especially black ones."
          },
          {
            title: "Mental Stimulation",
            content: "Labs need mental challenges as well as physical exercise. Training sessions, puzzle toys, and scent games provide essential mental stimulation."
          }
        ]
      },
      grooming: {
        title: "Grooming Your Labrador",
        description: "Labradors have a water-resistant double coat that requires regular maintenance to manage shedding and keep it healthy.",
        details: [
          {
            title: "Brushing",
            content: "Brush your Lab weekly with a slicker brush and undercoat rake to remove loose fur. During seasonal shedding (spring and fall), daily brushing may be necessary."
          },
          {
            title: "Bathing",
            content: "Bathe every 6-8 weeks or when dirty. Use a gentle dog shampoo to avoid stripping natural oils that waterproof their coat."
          },
          {
            title: "Ear Care",
            content: "Check and clean ears weekly, especially if your Lab swims frequently. Use a veterinarian-approved ear cleaner to prevent infections."
          },
          {
            title: "Nail Care",
            content: "Trim nails every 3-4 weeks. Active Labs may naturally wear their nails down somewhat, but regular maintenance is still needed."
          },
          {
            title: "Dental Care",
            content: "Brush teeth 2-3 times weekly with dog toothpaste. Dental chews and toys can help supplement brushing."
          }
        ]
      },
      health: {
        title: "Labrador Health Concerns",
        description: "While generally robust, Labradors are predisposed to certain health conditions that owners should monitor.",
        details: [
          {
            title: "Common Health Issues",
            content: "Hip and elbow dysplasia, progressive retinal atrophy (PRA), exercise-induced collapse, obesity, ear infections, and certain cancers."
          },
          {
            title: "Preventative Care",
            content: "Regular veterinary check-ups, keeping vaccinations current, monthly heartworm preventative, and joint supplements (especially for active dogs)."
          },
          {
            title: "Weight Management",
            content: "Weight control is crucial as Labs have a genetic predisposition to obesity. Excess weight worsens joint problems and other health issues."
          },
          {
            title: "Eye Health",
            content: "Annual eye exams are recommended to catch issues like PRA early. Watch for signs of vision problems or eye discomfort."
          },
          {
            title: "Senior Care",
            content: "As Labs age (7+ years), adjust exercise and diet accordingly. Consider joint supplements and more frequent health checks."
          }
        ]
      },
      training: {
        title: "Training Your Labrador",
        description: "Labradors are intelligent, eager to please, and highly trainable. Consistent, positive training yields excellent results.",
        details: [
          {
            title: "Basic Approach",
            content: "Use positive reinforcement techniques with praise and treats. Labs are food-motivated but also respond well to play rewards like a game of fetch."
          },
          {
            title: "Socialization",
            content: "Early socialization is essential. Expose Lab puppies to various environments, people, animals, and situations to develop a confident, adaptable dog."
          },
          {
            title: "Impulse Control",
            content: "Teaching impulse control is important for Labs, who can be exuberant. Practice 'wait,' 'stay,' and 'leave it' commands regularly."
          },
          {
            title: "Retrieving",
            content: "Channel their natural retrieving instincts with structured retrieving games. This provides both physical exercise and mental stimulation."
          },
          {
            title: "Mouthing",
            content: "Labs are naturally mouthy. Teach bite inhibition early and provide appropriate chew toys. Never encourage mouthing on hands or clothing."
          },
          {
            title: "Advanced Training",
            content: "Labs excel at dog sports like agility, obedience, tracking, and water retrieval. These activities provide excellent mental and physical exercise."
          }
        ]
      }
    },
    // Add more breeds as needed
  };

  // Default guide content if breed-specific information isn't available
  const defaultGuide = {
    nutrition: {
      title: "General Nutrition Guidelines",
      description: "Proper nutrition is essential for your dog's health and well-being.",
      details: [
        {
          title: "Quality Dog Food",
          content: "Feed high-quality commercial dog food appropriate for your dog's age, size, and activity level. Look for foods with real meat as the first ingredient and avoid products with excessive fillers."
        },
        {
          title: "Feeding Schedule",
          content: "Most adult dogs should be fed twice daily. Puppies need more frequent meals, typically 3-4 times per day until 6 months of age."
        },
        {
          title: "Portion Control",
          content: "Follow feeding guidelines on the food packaging as a starting point, but adjust based on your dog's individual needs. Monitor weight regularly and adjust portions accordingly."
        },
        {
          title: "Fresh Water",
          content: "Always provide clean, fresh water. Wash water bowls daily to prevent bacterial growth."
        }
      ]
    },
    exercise: {
      title: "Exercise Requirements",
      description: "Regular exercise is vital for your dog's physical health and mental well-being.",
      details: [
        {
          title: "Daily Activity",
          content: "Most dogs need at least 30-60 minutes of physical activity daily, though requirements vary by breed, age, and health status."
        },
        {
          title: "Types of Exercise",
          content: "Mix up activities to keep your dog engaged: walks, play sessions, fetch, swimming (if appropriate), and training games."
        },
        {
          title: "Mental Stimulation",
          content: "Mental exercise is as important as physical exercise. Use puzzle toys, training sessions, and nose work to stimulate your dog's mind."
        },
        {
          title: "Exercise Cautions",
          content: "Be mindful of weather conditions, especially extreme heat or cold. Adjust exercise intensity for puppies, senior dogs, and those with health issues."
        }
      ]
    },
    grooming: {
      title: "Grooming Basics",
      description: "Regular grooming keeps your dog comfortable, healthy, and looking their best.",
      details: [
        {
          title: "Brushing",
          content: "Brushing requirements vary by coat type. Short-haired dogs may need weekly brushing, while long-haired breeds often require daily attention."
        },
        {
          title: "Bathing",
          content: "Most dogs need bathing every 4-8 weeks, using dog-specific shampoo. Bathing too frequently can strip natural oils and cause skin problems."
        },
        {
          title: "Nail Care",
          content: "Trim nails every 3-4 weeks. If you can hear nails clicking on the floor, they're too long."
        },
        {
          title: "Ear Cleaning",
          content: "Check ears weekly for dirt, redness, or odor. Clean as needed with a veterinarian-recommended solution."
        },
        {
          title: "Dental Care",
          content: "Brush teeth at least 2-3 times weekly with dog-specific toothpaste to prevent dental disease."
        }
      ]
    },
    health: {
      title: "Health Maintenance",
      description: "Preventative care and regular monitoring are key to your dog's long-term health.",
      details: [
        {
          title: "Veterinary Care",
          content: "Schedule regular check-ups (annually for adults, twice yearly for seniors). Keep vaccinations current based on your vet's recommendations."
        },
        {
          title: "Parasite Prevention",
          content: "Maintain year-round heartworm, flea, and tick prevention as recommended by your veterinarian."
        },
        {
          title: "Weight Management",
          content: "Maintain a healthy weight to prevent obesity-related health problems. You should be able to feel (but not see) your dog's ribs."
        },
        {
          title: "Health Monitoring",
          content: "Learn your dog's normal behavior and appearance. Watch for changes in appetite, water consumption, energy level, or bathroom habits."
        },
        {
          title: "Emergency Preparation",
          content: "Know the location of emergency veterinary facilities in your area and have a plan for transportation in case of emergency."
        }
      ]
    },
    training: {
      title: "Training Fundamentals",
      description: "Proper training creates a well-behaved companion and strengthens your bond.",
      details: [
        {
          title: "Positive Reinforcement",
          content: "Use rewards (treats, praise, toys) to reinforce good behavior. Avoid punishment-based methods, which can damage trust and create fear."
        },
        {
          title: "Consistency",
          content: "Be consistent with commands, rules, and expectations. Everyone in the household should use the same cues and enforce the same rules."
        },
        {
          title: "Socialization",
          content: "Expose your dog to various people, animals, environments, and situations, especially during puppyhood, to develop a well-adjusted adult dog."
        },
        {
          title: "Basic Commands",
          content: "Teach essential commands like sit, stay, come, leave it, and walk nicely on a leash. These form the foundation for more advanced training."
        },
        {
          title: "Problem Behaviors",
          content: "Address unwanted behaviors promptly. Consult a professional trainer or behaviorist for serious or persistent issues."
        }
      ]
    }
  };

  // Get the care guide for the selected breed or use the default
  const breedLowerCase = breed.toLowerCase();
  const breedGuide = careGuides[breedLowerCase] || defaultGuide;

  // Toggle a specific section
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get the content for the active tab
  const getActiveContent = () => {
    const content = breedGuide[activeTab];
    if (!content) return null;

    return (
      <div className="care-guide-content">
        <h4>{content.title}</h4>
        <p className="care-guide-description">{content.description}</p>
        
        <div className="care-guide-details">
          {content.details.map((detail, index) => (
            <div key={index} className="care-guide-detail-item">
              <h5>{detail.title}</h5>
              <p>{detail.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Display icons for each tab
  const getTabIcon = (tab) => {
    switch (tab) {
      case 'nutrition':
        return <FaBone />;
      case 'exercise':
        return <FaRunning />;
      case 'grooming':
        return <FaCut />;
      case 'health':
        return <FaHeart />;
      case 'training':
        return <FaBrain />;
      default:
        return <FaPaw />;
    }
  };

  return (
    <div className="breed-care-guide">
      <h3>Care Guide for {breed.charAt(0).toUpperCase() + breed.slice(1)}</h3>
      
      {/* Desktop version: horizontal tabs */}
      <div className="care-guide-tabs desktop-tabs">
        {Object.keys(breedGuide).map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {getTabIcon(tab)}
            <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
          </button>
        ))}
      </div>
      
      {/* Mobile version: accordion style */}
      <div className="care-guide-accordion mobile-tabs">
        {Object.keys(breedGuide).map((tab) => (
          <div key={tab} className="accordion-item">
            <button
              className={`accordion-header ${expandedSections[tab] ? 'active' : ''}`}
              onClick={() => toggleSection(tab)}
            >
              <div className="accordion-title">
                {getTabIcon(tab)}
                <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              </div>
              {expandedSections[tab] ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
            {expandedSections[tab] && (
              <div className="accordion-content">
                <div className="care-guide-content">
                  <h4>{breedGuide[tab].title}</h4>
                  <p className="care-guide-description">{breedGuide[tab].description}</p>
                  
                  <div className="care-guide-details">
                    {breedGuide[tab].details.map((detail, index) => (
                      <div key={index} className="care-guide-detail-item">
                        <h5>{detail.title}</h5>
                        <p>{detail.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Content for desktop view */}
      <div className="desktop-content">
        {getActiveContent()}
      </div>
    </div>
  );
};

export default BreedCareGuide;