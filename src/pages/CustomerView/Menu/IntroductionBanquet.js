import React from 'react';

const IntroductionBanquet = () => {
  return (
    <div>
      <h1 className="mb-4">Introduction to Banquet Menu</h1>
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
