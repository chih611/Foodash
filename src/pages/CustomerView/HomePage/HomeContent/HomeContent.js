import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../../../../store/slices/itemsSlice";
import { Col, Row } from "react-bootstrap";
import HomeSideBar from "../HomeSideBar/HomeSideBar";
import HomeFilterBar from "./HomeFilterBar";
import HomeItemContainer from "../HomeItemContainer/HomeItemContainer";
import {
  selectItems,
  selectCategoryItems,
} from "../../../../../store/selector/selector";

const HomeContent = () => {
  const dispatch = useDispatch();
  const { items, searchResults, status, error } = useSelector(
    (state) => state.items
  );
  const categoryItems = useSelector(selectCategoryItems);

  useEffect(() => {
    dispatch(fetchItems()); // Fetch all items initially
  }, [dispatch]);

  // Error state
  if (status === "failed") {
    return <div>Error: {error?.message || "An unexpected error occurred"}</div>;
  }

  // Loading state
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Determine which items to display
  const displayedItems =
    searchResults.length > 0
      ? searchResults // Show search results if there are any matches
      : categoryItems.length > 0
      ? categoryItems // If a category is selected, show category items
      : items; // Fallback to showing all items

  return (
    <div className="container">
      <Row>
        <Col xs={12} sm={4} md={3} lg={3}>
          <div className="home-sidebar">
            <HomeSideBar />
          </div>
        </Col>
        <Col xs={12} sm={8} md={9} lg={9}>
          <div className="home-content">
            <HomeFilterBar />
            <div className="homeContentSection">
              <Row>
                {displayedItems.length > 0 ? (
                  displayedItems.map((item) => (
                    <HomeItemContainer key={item.ITEM_ID} item={item} />
                  ))
                ) : (
                  <p>No items available.</p>
                )}
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomeContent;
