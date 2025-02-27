import React from 'react';

const Academics = () => {
  return (
    <div className="academics-container">
      <h1>Academics</h1>
      <p>At Sri Sai Blossoms, we follow a comprehensive curriculum that focuses on conceptual understanding, skill development, and practical application of knowledge.</p>
      
      <section className="curriculum">
        <h2>Curriculum</h2>
        <p>Our curriculum is designed to foster critical thinking, creativity, and a love for learning. We follow the CBSE syllabus with additional enrichment activities.</p>
        
        <div className="curriculum-levels">
          <div className="level">
            <h3>Pre-Primary (Pre-Nursery to UKG)</h3>
            <p>Play-based learning focusing on developing motor skills, language acquisition, basic numeracy, and social skills.</p>
          </div>
          <div className="level">
            <h3>Primary (Grades 1-5)</h3>
            <p>Foundation in language, mathematics, environmental studies, arts, and physical education with an emphasis on inquiry-based learning.</p>
          </div>
          <div className="level">
            <h3>Middle School (Grades 6-8)</h3>
            <p>In-depth study of languages, mathematics, sciences, social studies, and introduction to computer science and additional languages.</p>
          </div>
          <div className="level">
            <h3>High School (Grades 9-10)</h3>
            <p>Preparation for board examinations with specialized focus on core subjects and electives tailored to student interests and career goals.</p>
          </div>
        </div>
      </section>
      
      <section className="class-schedules">
        <h2>Class Schedules</h2>
        <table>
          <thead>
            <tr>
              <th>Grade Level</th>
              <th>School Hours</th>
              <th>Break Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pre-Primary</td>
              <td>9:00 AM - 12:30 PM</td>
              <td>10:30 AM - 11:00 AM</td>
            </tr>
            <tr>
              <td>Primary</td>
              <td>8:30 AM - 2:30 PM</td>
              <td>10:30 AM - 11:00 AM & 1:00 PM - 1:30 PM</td>
            </tr>
            <tr>
              <td>Middle School</td>
              <td>8:30 AM - 3:30 PM</td>
              <td>10:30 AM - 11:00 AM & 1:00 PM - 1:30 PM</td>
            </tr>
            <tr>
              <td>High School</td>
              <td>8:30 AM - 3:30 PM</td>
              <td>10:30 AM - 11:00 AM & 1:00 PM - 1:30 PM</td>
            </tr>
          </tbody>
        </table>
      </section>
      
      <section className="exam-schedules">
        <h2>Exam Schedules</h2>
        <div className="exam-cycle">
          <div className="exam-period">
            <h3>Formative Assessments</h3>
            <p>Continuous evaluation through projects, assignments, class participation, and periodic tests.</p>
          </div>
          <div className="exam-period">
            <h3>Summative Assessment 1 (Half Yearly)</h3>
            <p>September/October</p>
          </div>
          <div className="exam-period">
            <h3>Summative Assessment 2 (Final)</h3>
            <p>March/April</p>
          </div>
        </div>
        <button className="calendar-button">Download Academic Calendar</button>
      </section>
    </div>
  );
};

export default Academics;
