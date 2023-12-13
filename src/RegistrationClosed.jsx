import React from 'react';
import societyLogo from "./assets/logo.png"
import './RegistrationClosed.css'; // Import your CSS file

const RegistrationClosed = () => {
  return (
    <div className='closed-container'>
        <div className="registration-closed">
      <img src={societyLogo} alt="Society Logo" className="society-logo" />
      <h1>Registration Closed</h1>
      <p>
        Thank you for your interest in our event. Registration is now closed. We appreciate your
        enthusiasm and hope to see you at future events hosted by the Machine Learning Center of Excellence.
        <br />
        For further queries contact our Team Members
      </p>
    </div>
    </div>
  );
};

export default RegistrationClosed;
