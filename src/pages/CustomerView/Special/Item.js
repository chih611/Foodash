import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';


const Item = () => {
  return (
    <div className="item-card">
      <div className="item-image">
        <img src="placeholder.png" alt="Party Meat Catering" />
      </div>
      <div className="item-info">
        <p className="price">$23.5</p>
        <div className="item-actions">
          <button><FavoriteIcon /></button>
          <button><AddShoppingCartIcon /></button>
        </div>
      </div>
    </div>
  );
};

export default Item;
