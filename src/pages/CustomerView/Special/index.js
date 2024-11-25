import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../../../store/slices/itemsSlice";
import HomePageNavBar from "../HomePage/HomePageNavBar";
import HomeDirectionLink from "../HomePage/HomeDirectionLink/HomeDirectionLink";
import SpecialSection from "./Special_Section";
import Advertisement from "./Advertisement";
import ChatBot from "../ChatBot/ChatBot";

const Special = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const allCategories = useSelector((state) => state.category.categories);
  // Filter to get only special items
  const specialItems = items.filter((item) => item.SPECIAL_STATUS !== 0);

  useEffect(() => {
    dispatch(fetchItems()); // Fetch all items when the component mounts
  }, [dispatch]);

  // Helper function to group special items by category
  const groupSpecialItemsByCategory = () => {
    const itemsByCategory = {};
    specialItems.forEach((item) => {
      const categoryId = item.CATEGORY_ID;
      if (!itemsByCategory[categoryId]) {
        itemsByCategory[categoryId] = [];
      }
      itemsByCategory[categoryId].push(item);
    });
    return itemsByCategory;
  };

  const specialItemsByCategory = groupSpecialItemsByCategory();

  return (
    <Container className="special-container">
      <HomePageNavBar />
      <HomeDirectionLink />

      <h1 className="title">Special Deals</h1>

      <main>
        {/* Dynamically render SpecialSection for each category */}
        {allCategories &&
          allCategories.map((category) => (
            <SpecialSection
              key={category.CATEGORY_ID}
              title={category.CATEGORY_NAME}
              items={specialItemsByCategory[category.CATEGORY_ID]}
            />
          ))}
      </main>
      <ChatBot />
    </Container>
  );
};

export default Special;
