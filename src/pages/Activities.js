import React, { useState, useEffect } from 'react';
import '../styles/Common.css';
import '../styles/Activities.css';

// Placeholder image URLs - replace with actual images
const activityImages = {
  art: "https://via.placeholder.com/400x300/FFD1DC/333333?text=Art+%26+Craft",
  music: "https://via.placeholder.com/400x300/D1FFDC/333333?text=Music+%26+Dance",
  outdoor: "https://via.placeholder.com/400x300/D1DCFF/333333?text=Outdoor+Play",
  science: "https://via.placeholder.com/400x300/FFD1DC/333333?text=Science+Fun",
  story: "https://via.placeholder.com/400x300/FFFFD1/333333?text=Storytelling",
  sensory: "https://via.placeholder.com/400x300/D1FFFF/333333?text=Sensory+Play"
};

const Activities = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const activities = [
    {
      id: 1,
      title: "Finger Painting Adventures",
      description: "Children explore colors, textures, and express their creativity through hands-on finger painting activities.",
      image: activityImages.art,
      category: "art",
      ageGroups: ["Pre-KG", "LKG"],
      benefits: ["Creativity", "Fine Motor Skills"]
    },
    {
      id: 2,
      title: "Rhythm & Movement",
      description: "Fun-filled musical sessions where children learn about rhythm, sounds, and express themselves through movement.",
      image: activityImages.music,
      category: "music",
      ageGroups: ["All Ages"],
      benefits: ["Coordination", "Expression"]
    },
    {
      id: 3,
      title: "Nature Explorers",
      description: "Outdoor activities that encourage children to discover and appreciate the natural world around them.",
      image: activityImages.outdoor,
      category: "outdoor",
      ageGroups: ["LKG", "UKG"],
      benefits: ["Observation", "Physical Activity"]
    },
    {
      id: 4,
      title: "Bubble Science",
      description: "Simple scientific experiments with bubbles that introduce children to basic scientific concepts.",
      image: activityImages.science,
      category: "science",
      ageGroups: ["UKG"],
      benefits: ["Curiosity", "Problem Solving"]
    },
    {
      id: 5,
      title: "Puppet Storytelling",
      description: "Interactive storytelling sessions using puppets to enhance language development and imagination.",
      image: activityImages.story,
      category: "story",
      ageGroups: ["All Ages"],
      benefits: ["Language", "Imagination"]
    },
    {
      id: 6,
      title: "Sensory Bins Exploration",
      description: "Tactile experiences with various materials that stimulate children's senses and discovery.",
      image: activityImages.sensory,
      category: "sensory",
      ageGroups: ["Pre-KG", "LKG"],
      benefits: ["Sensory Development", "Exploration"]
    }
  ];
  
  const filteredActivities = activeCategory === 'all' 
    ? activities 
    : activities.filter(activity => activity.category === activeCategory);
  
  useEffect(() => {
    // Animation for fade-in elements
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, 300 * index);
    });
  }, [activeCategory]);
  
  return (
    <div className="activities-container">
      <header className="page-header">
        <div className="container">
          <h1 className="fade-in">Fun Learning Activities</h1>
          <p className="fade-in">Discover the exciting activities that help our little ones learn, grow, and have fun!</p>
        </div>
      </header>
      
      <section className="section">
        <div className="container">
          <div className="category-tabs fade-in">
            <button 
              className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Activities
            </button>
            <button 
              className={`category-tab ${activeCategory === 'art' ? 'active' : ''}`}
              onClick={() => setActiveCategory('art')}
            >
              Art & Craft
            </button>
            <button 
              className={`category-tab ${activeCategory === 'music' ? 'active' : ''}`}
              onClick={() => setActiveCategory('music')}
            >
              Music & Dance
            </button>
            <button 
              className={`category-tab ${activeCategory === 'outdoor' ? 'active' : ''}`}
              onClick={() => setActiveCategory('outdoor')}
            >
              Outdoor Play
            </button>
            <button 
              className={`category-tab ${activeCategory === 'science' ? 'active' : ''}`}
              onClick={() => setActiveCategory('science')}
            >
              Science Fun
            </button>
            <button 
              className={`category-tab ${activeCategory === 'story' ? 'active' : ''}`}
              onClick={() => setActiveCategory('story')}
            >
              Storytelling
            </button>
            <button 
              className={`category-tab ${activeCategory === 'sensory' ? 'active' : ''}`}
              onClick={() => setActiveCategory('sensory')}
            >
              Sensory Play
            </button>
          </div>
          
          <div className="activities-grid">
            {filteredActivities.map((activity) => (
              <div className="activity-card fade-in" key={activity.id}>
                <div className="activity-image-container">
                  <img src={activity.image} alt={activity.title} className="activity-image" />
                </div>
                <div className="activity-content">
                  <h3 className="activity-title">{activity.title}</h3>
                  <div className="benefit-tags">
                    {activity.benefits.map((benefit, index) => (
                      <span className="benefit-tag" key={index}>{benefit}</span>
                    ))}
                  </div>
                  <p className="activity-description">{activity.description}</p>
                  <div className="activity-footer">
                    <span className="age-group">For: {activity.ageGroups.join(", ")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Activities;
