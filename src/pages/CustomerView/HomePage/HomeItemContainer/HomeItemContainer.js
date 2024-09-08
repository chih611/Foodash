import React from "react";

const HomeItemContainer = () => {
  return (
    <div className="item-container">
      <div className="item-image">
        <img src="https://via.placeholder.com/150" alt="Item" />
      </div>
      <div className="item-details">
        <h3>Item Name</h3>
        <p>Item Description</p>
      </div>
    </div>
  );
};

export default HomeItemContainer;
