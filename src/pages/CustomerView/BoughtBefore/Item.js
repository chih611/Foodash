import React from 'react';
// import './Item.scss';

const Item = () => {
  return (
    <div className="item-card">
      <div className="item-image">
        <img src="placeholder.png" alt="Party Meat Catering" />
      </div>
      <div className="item-info">
        <p className="price">$23.5</p>
        <div className="item-actions">
          <button className="favorite-btn">❤</button>
          <button className="cart-btn">🛒</button>
        </div>
      </div>
    </div>
  );
};

export default Item;
