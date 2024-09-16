import React from "react";
import HomeDirectionLink from "../HomePage/HomeDirectionLink/HomeDirectionLink";
import { useSelector } from "react-redux";
import ItemsInformation from "./ItemsInformation";
const ItemDetails = () => {
  const selectedItem = useSelector((state) => state.items.selectedItem);
  return (
    <div className="item-details-page">
      <h1>ItemDetails</h1>
      <HomeDirectionLink />
      <div className="container">
        <ItemsInformation item={selectedItem} />{" "}
      </div>
    </div>
  );
};

export default ItemDetails;
