import React from 'react';
import '../styles/Admissions.css';
const Admissions = () => {
  return (
    <div className="admissions-container">
      <h1>Admissions</h1>
      <p>Join the Sri Sai Blossoms family and give your child the gift of quality education.</p>
      
      <section className="admission-process">
        <h2>Admission Process</h2>
        <ol>
          <li>
            <h3>Application Submission</h3>
            <p>Complete the application form and submit it along with required documents.</p>
          </li>
          <li>
            <h3>Entrance Assessment</h3>
            <p>Age-appropriate assessment to understand your child's learning level.</p>
          </li>
          <li>
            <h3>Parent Interview</h3>
            <p>A brief interaction with parents to understand expectations and answer queries.</p>
          </li>
          <li>
            <h3>Admission Confirmation</h3>
            <p>Selected candidates will receive an admission offer letter.</p>
          </li>
          <li>
            <h3>Fee Payment</h3>
            <p>Secure your child's seat by paying the registration fee within the stipulated time.</p>
          </li>
        </ol>
      </section>
      
      <section className="eligibility">
        <h2>Eligibility Criteria</h2>
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Age Requirement (as of June 1st)</th>
              <th>Academic Requirements</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pre-Nursery</td>
              <td>2.5 - 3.5 years</td>
              <td>None</td>
            </tr>
            <tr>
              <td>Nursery</td>
              <td>3.5 - 4.5 years</td>
              <td>None</td>
            </tr>
            <tr>
              <td>LKG</td>
              <td>4.5 - 5.5 years</td>
              <td>None</td>
            </tr>
            <tr>
              <td>UKG</td>
              <td>5.5 - 6.5 years</td>
              <td>Basic literacy and numeracy skills</td>
            </tr>
            <tr>
              <td>Grade 1 and above</td>
              <td>Age appropriate</td>
              <td>Performance in entrance assessment and previous academic records</td>
            </tr>
          </tbody>
        </table>
      </section>
      
      <section className="application-forms">
        <h2>Application Forms</h2>
        <p>Application forms can be obtained through any of the following methods:</p>
        <ul>
          <li>Download from our website</li>
          <li>Collect in person from the school office</li>
          <li>Request via email</li>
        </ul>
        <button className="download-button">Download Application Form</button>
      </section>
    </div>
  );
};

export default Admissions;
