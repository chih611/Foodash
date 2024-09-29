import React from 'react';

const WeddingMenu = () => {
  const containerStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Black with 20% opacity
    borderRadius: '15px', // Rounded corners
    padding: '20px', // Padding inside the container
    color: 'white', // Text color to be white
    textAlign: 'center', // Center the text
  };

  return (
    <div>
      <div style={containerStyle}>
        <h1 className="mb-4">Banquet for Weddings</h1>
        <p className="mb-5" style={{ fontSize: '1.2rem' }}>
          Celebrate your special day with our exquisite wedding banquet options that make every moment memorable.
        </p>

        {/* Starters */}
        <h3>Starters</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>Charcuterie Board: Selection of cured meats, cheeses, and artisan bread.</li>
          <li>Shrimp Cocktail: Jumbo shrimp served with a tangy cocktail sauce.</li>
          <li>Stuffed Mushrooms: Baked mushrooms filled with herbed cream cheese and breadcrumbs.</li>
          <li>Bruschetta: Toasted baguette slices topped with tomatoes, garlic, and basil.</li>
        </ul>

        {/* Main Courses */}
        <h3>Main Courses</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>Herb-Crusted Lamb Chops: Served with a mint yogurt sauce.</li>
          <li>Chicken Piccata: Lightly breaded chicken breast served with a lemon-caper butter sauce.</li>
          <li>Seared Scallops: Served with a cauliflower puree and truffle oil.</li>
          <li>Butternut Squash Risotto: Creamy risotto with roasted butternut squash and sage (vegetarian option).</li>
        </ul>

        {/* Sides */}
        <h3>Sides</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>Truffle Mashed Potatoes: Rich mashed potatoes with a hint of truffle oil.</li>
          <li>Grilled Asparagus: Drizzled with lemon and olive oil.</li>
          <li>Wild Rice Pilaf: With cranberries and toasted almonds.</li>
          <li>Arugula Salad: Tossed with pears, walnuts, and balsamic vinaigrette.</li>
        </ul>

        {/* Desserts */}
        <h3>Desserts</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>Wedding Cake: A classic tiered wedding cake with buttercream frosting and seasonal fruit.</li>
          <li>Macaron Tower: Assorted macarons in flavors like pistachio, raspberry, and chocolate.</li>
          <li>Tiramisu Cups: Traditional Italian tiramisu served in individual cups.</li>
          <li>Chocolate-Dipped Strawberries: Fresh strawberries dipped in white and dark chocolate.</li>
        </ul>
      </div>
    </div>
  );
};

export default WeddingMenu;
