import React from 'react';
import './Portfolio.css'; // Ensure this CSS file exists in the correct directory

function Portfolio() {
  return (
    <div className="portfolio-container">
      <div className="profile-section">
        <img src={`${process.env.PUBLIC_URL}/profile.png`} alt="Profile" className="profile-image" />
        <h1 className="profile-title">Xixo</h1>
        <p className="profile-description">
          🎸 By day, I'm orchestrating success in management and customer support, ensuring smooth operations like a well-tuned bass line. But as the sun sets, I don my rockstar persona, slapping the strings and jamming out with my band. 🌟
          <br /><br />
          With a background in management and a talent for keeping clients satisfied, I've mastered the art of leadership, problem-solving, and communication. Yet, as the curtain falls on my current chapter, I'm tuning into a new melody - transitioning to a career in development. 💻
          <br /><br />
          Armed with my trusty bass and a degree in management, I'm ready to riff on the code, bringing my unique blend of business acumen and musical flair to the tech world.
          <br /><br />
          Let's harmonize and compose a new symphony of success together - both on stage and in the digital realm!
        </p>
      </div>
    </div>
  );
}

export default Portfolio;

