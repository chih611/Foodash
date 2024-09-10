import React from "react";
import HomeDirectionLink from "../HomePage/HomeDirectionLink/HomeDirectionLink";
import ItemsInformation from "./ItemsInformation";
const ItemDetails = () => {
  return (
    <div className="item-details-page">
      <h1>ItemDetails</h1>
      <HomeDirectionLink />
      <div className="container">
        <ItemsInformation />
      </div>
    </div>
  );
};

export default ItemDetails;
