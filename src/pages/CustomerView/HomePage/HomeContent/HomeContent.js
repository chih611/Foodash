import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../../../../store/slices/itemsSlice";
import { Col, Row } from "react-bootstrap";
import HomeSideBar from "../HomeSideBar/HomeSideBar";
import HomeFilterBar from "./HomeFilterBar";
import HomeItemContainer from "../HomeItemContainer/HomeItemContainer";
import { selectCategoryItems } from "../../../../../store/selector/selector";
import { useRouter } from "next/router";

const HomeContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchQuery = router.query.search || ""; // Fetch search query from URL

  const { items, searchResults, status } = useSelector((state) => state.items);
  console.log("items", items);
  const categoryItems = useSelector(selectCategoryItems);

  useEffect(() => {
    dispatch(fetchItems()); // Fetch all items initially
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;

  // Check if no items match the search and search query exists
  if (searchQuery && searchResults.length === 0 && status === "succeeded") {
    return (
      <div
        className="no-items-found"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <p>No items match your search</p>
        <button
          style={{
            color: "#025373",
            textDecoration: "underline",
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: "0",
          }}
          onClick={() => router.push("/CustomerView/HomePage")}
        >
          Go back to the homepage
        </button>
      </div>
    );
  }

  // Determine which items to display
  const displayedItems =
    searchQuery && searchResults.length > 0
      ? searchResults // Show search results if there are any matches
      : !searchQuery && categoryItems.length > 0
      ? categoryItems // If a category is selected and no search is active, show category items
      : !searchQuery
      ? items // Fallback to showing all items if no search is made
      : []; // Ensure an empty array is used if the search is empty

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
                  <div
                    className="no-items-found"
                    style={{ textAlign: "center", marginTop: "20px" }}
                  >
                    <p>No items match your search</p>
                    <button
                      style={{
                        color: "#025373",
                        textDecoration: "underline",
                        cursor: "pointer",
                        background: "none",
                        border: "none",
                        padding: "0",
                      }}
                      onClick={() => router.push("/CustomerView/HomePage/")}
                    >
                      Go back to the homepage
                    </button>
                  </div>
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
