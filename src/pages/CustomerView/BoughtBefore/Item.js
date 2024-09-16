import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Item = () => {
  return (
    <div className="item-card">
      <div className="item-info">
        <p className="item-title">Party Meat Catering</p>
        <p className="price">$23.5</p>
        <div className="item-actions">
          <button className="action-btn">
            <FavoriteIcon />
          </button>
          <button className="action-btn">
            <AddShoppingCartIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
