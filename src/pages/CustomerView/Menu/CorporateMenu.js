import React from 'react';

const CorporateMenu = () => {
  const containerStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Black with 20% opacity
    borderRadius: '15px', // Round the corners
    padding: '20px', // Add some padding inside the container
    color: 'white', // Text color to be white
    textAlign: 'center', // Center the text
  };

  return (
    <div>
      <div style={containerStyle}>
        <h1 className="mb-4">Banquet for Corporate Events</h1>
        <p className="mb-5" style={{ fontSize: '1.2rem' }}>
          Impress your clients and colleagues with a premium banquet experience designed for corporate events.
        </p>

        {/* Starters */}
        <h3>Starters</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>Assorted Canapés: Smoked salmon with dill cream, mini caprese skewers, and prosciutto-wrapped melon.</li>
          <li>Spinach & Artichoke Dip: Served with toasted crostini and pita chips.</li>
          <li>Mini Quiches: Spinach and feta, and bacon and cheddar varieties.</li>
        </ul>

        {/* Main Courses */}
        <h3>Main Courses</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>Grilled Chicken Breast: Served with a lemon herb sauce or creamy mushroom sauce.</li>
          <li>Beef Tenderloin Medallions: Cooked medium, with a red wine reduction.</li>
          <li>Vegetarian Lasagna: Layers of pasta with spinach, ricotta, and marinara.</li>
          <li>Grilled Salmon: Served with a honey mustard glaze.</li>
        </ul>

        {/* Sides */}
        <h3>Sides</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>Roasted Vegetables: Seasonal vegetables with a balsamic glaze.</li>
          <li>Garlic Mashed Potatoes: Creamy mashed potatoes with roasted garlic.</li>
          <li>Quinoa Salad: With cucumber, tomato, and lemon vinaigrette.</li>
          <li>Steamed Asparagus: Lightly seasoned with olive oil and sea salt.</li>
        </ul>

        {/* Desserts */}
        <h3>Desserts</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>Mini Cheesecakes: Assorted flavors like raspberry swirl, classic, and chocolate.</li>
          <li>Chocolate Mousse Cups: Light, fluffy chocolate mousse topped with whipped cream.</li>
          <li>Fresh Fruit Tart: Pastry crust filled with vanilla custard and fresh fruit.</li>
        </ul>
      </div>
    </div>
  );
};

export default CorporateMenu;
