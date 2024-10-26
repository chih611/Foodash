import React, { useState } from 'react';

const IntroductionBanquet = () => {
  const [hover, setHover] = useState(false);

  const hoverStyle = {
    color: hover ? 'blue' : 'white', // Change color on hover
    cursor: 'pointer',
  };

  const containerStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Black with 20% opacity
    borderRadius: '15px', // Rounded corners
    padding: '20px', // Padding inside the container
    color: 'white', // Text color default to white
    textAlign: 'center', // Center the text
  };

  return (
    <div style={containerStyle}>
      <h1 className="mb-4" style={hoverStyle} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        Introduction to Banquet Menu
      </h1>
      <p className="mb-5" style={{ fontSize: '1.5rem' }}>
        Welcome to our exclusive banquet offerings. We specialize in creating exceptional experiences tailored for any occasion. Our banquet services cater to the following three main event types:
      </p>

      {/* Corporate Events */}
      <h3>Corporate Events</h3>
      <p>
        Whether it’s a product launch, conference, or annual meeting, we offer a range of menus designed to impress your colleagues and clients.
      </p>

      {/* Weddings */}
      <h3>Weddings</h3>
      <p>
        Celebrate love with our exquisite wedding banquet options, including elegant meals and personalized touches that make your special day unforgettable.
      </p>

      {/* Family Gatherings */}
      <h3>Family Gatherings</h3>
      <p>
        From intimate family reunions to festive holiday dinners, we offer delicious, comforting meals that bring people together.
      </p>
    </div>
  );
};

export default IntroductionBanquet;
