import React from 'react';

const Facilities = () => {
  const facilities = [
    {
      name: 'Infrastructure',
      description: 'Our school features modern, well-designed classrooms with adequate lighting and ventilation. The campus is equipped with ramps and elevators for accessibility, safe drinking water stations, and eco-friendly waste management systems.',
      features: [
        'Spacious, well-ventilated classrooms',
        'Air-conditioned multimedia rooms',
        'Separate blocks for primary and secondary sections',
        'Solar-powered energy systems',
        'Rain water harvesting'
      ]
    },
    {
      name: 'Library',
      description: 'Our well-stocked library houses a vast collection of books, magazines, and digital resources to foster a love for reading and research.',
      features: [
        '10,000+ books across various subjects and genres',
        'Dedicated reading areas for different age groups',
        'Digital cataloging system',
        'Regular book fairs and reading programs',
        'Subscription to educational magazines and journals'
      ]
    },
    {
      name: 'Laboratories',
      description: 'State-of-the-art laboratories provide hands-on learning experiences in science, technology, and arts.',
      features: [
        'Physics, Chemistry, and Biology labs with modern equipment',
        'Computer lab with high-speed internet',
        'Language lab for improving communication skills',
        'Robotics and innovation lab',
        'Arts and crafts studio'
      ]
    },
    {
      name: 'Sports Facilities',
      description: 'We offer comprehensive sports facilities to promote physical fitness and team spirit among students.',
      features: [
        'Multi-purpose playground',
        'Indoor sports complex',
        'Swimming pool with trained instructors',
        'Yoga and meditation hall',
        'Basketball and volleyball courts',
        'Table tennis and badminton facilities'
      ]
    }
  ];

  return (
    <div className="facilities-container">
      <h1>Facilities</h1>
      <p>Sri Sai Blossoms provides world-class facilities to ensure a comfortable and conducive environment for learning and growth.</p>
      
      <div className="facilities-grid">
        {facilities.map((facility, index) => (
          <div className="facility-card" key={index}>
            <h2>{facility.name}</h2>
            <p>{facility.description}</p>
            <h3>Features:</h3>
            <ul>
              {facility.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
