import React from 'react';

const FamilyMenu = () => {
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
        <h1 className="mb-4">Banquet for Family</h1>
        <p className="mb-5" style={{ fontSize: '1.2rem' }}>
          Enjoy a cozy family gathering with our specially curated family banquet menu.
        </p>

        {/* Starters */}
        <h3>Starters</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>Garlic Breadsticks: Freshly baked with garlic butter.</li>
          <li>Caprese Salad: Fresh mozzarella, tomatoes, and basil with balsamic drizzle.</li>
          <li>Buffalo Chicken Wings: Served with ranch dressing and celery sticks.</li>
          <li>Mini Sliders: Beef sliders with cheddar cheese and pickles.</li>
        </ul>

        {/* Main Courses */}
        <h3>Main Courses</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>Roast Chicken: Family-style roasted chicken served with rosemary and lemon.</li>
          <li>BBQ Ribs: Slow-cooked ribs with a tangy barbecue sauce.</li>
          <li>Spaghetti & Meatballs: Classic pasta with rich tomato sauce and handmade meatballs.</li>
          <li>Vegetarian Stir-Fry: A mix of bell peppers, broccoli, tofu, and soy-ginger sauce.</li>
        </ul>

        {/* Sides */}
        <h3>Sides</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>Macaroni and Cheese: Creamy mac and cheese, baked with a breadcrumb topping.</li>
          <li>Caesar Salad: Crisp romaine, croutons, and Parmesan with Caesar dressing.</li>
          <li>Roasted Potatoes: Herbed roasted baby potatoes with olive oil and garlic.</li>
          <li>Steamed Broccoli: Lightly steamed broccoli with a cheese sauce option.</li>
        </ul>

        {/* Desserts */}
        <h3>Desserts</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>Apple Pie: Classic apple pie with a flaky crust, served with vanilla ice cream.</li>
          <li>Brownies: Rich, fudgy brownies with a sprinkle of powdered sugar.</li>
          <li>Fruit Salad: A mix of seasonal fruits like watermelon, berries, and kiwi.</li>
          <li>Chocolate Chip Cookies: Warm, freshly baked cookies.</li>
        </ul>
      </div>
    </div>
  );
};

export default FamilyMenu;
