import React from 'react';
import '../styles/About.css'; // Ensure this path is correct

const About = () => {
  return (
    <div className="about-container">
      <h1>About Sri Sai Blossoms</h1>
      
      <section className="history">
        <h2>Our History</h2>
        <p>Founded in 2005, Sri Sai Blossoms began as a small educational initiative with just 50 students. 
        Over the years, we have grown into a comprehensive educational institution serving hundreds of families 
        in our community. Our journey has been marked by a commitment to excellence and innovation in education.</p>
      </section>
      
      <section className="vision-mission">
        <div className="vision">
          <h2>Our Vision</h2>
          <p>To create a learning environment where every child discovers their potential and grows into 
          responsible, compassionate, and knowledgeable individuals who contribute positively to society.</p>
        </div>
        
        <div className="mission">
          <h2>Our Mission</h2>
          <p>To provide quality education that balances academic excellence with moral values and life skills, 
          preparing students for the challenges of the future while nurturing their curiosity and creativity.</p>
        </div>
      </section>
      
      <section className="faculty">
        <h2>Faculty and Staff</h2>
        <p>Our team consists of highly qualified and experienced educators who are passionate about teaching 
        and dedicated to the well-being of every student. Our staff members undergo regular professional 
        development to stay updated with the latest educational methodologies.</p>
        
        <div className="faculty-stats">
          <div className="stat-box">
            <h3>25+</h3>
            <p>Qualified Teachers</p>
          </div>
          <div className="stat-box">
            <h3>15+</h3>
            <p>Support Staff</p>
          </div>
          <div className="stat-box">
            <h3>80%</h3>
            <p>Teachers with Master's Degree</p>
          </div>
          <div className="stat-box">
            <h3>10+</h3>
            <p>Years Average Experience</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;