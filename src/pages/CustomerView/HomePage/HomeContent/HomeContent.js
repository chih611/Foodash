import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../../../../store/slices/itemsSlice";
import { Col, Row, Button, Container } from "react-bootstrap";
import HomeSideBar from "../HomeSideBar/HomeSideBar";
import HomeFilterBar from "./HomeFilterBar";
import HomeItemContainer from "../HomeItemContainer/HomeItemContainer";
import HomeCategoryContainer from "../HomeCategoryContainer/HomeCategoryContainer";
import { selectCategoryItems } from "../../../../../store/selector/selector";
import { useRouter } from "next/router";

const HomeContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchQuery = router.query.search || ""; // Fetch search query from URL
  const selectedCategory = router.query.category || ""; // Fetch selected category from URL

  const { items, searchResults, status } = useSelector((state) => state.items);
  const categoryItems = useSelector(selectCategoryItems); // Assumed selector for filtered category items

  const [currentView, setCurrentView] = useState("categories");

  useEffect(() => {
    dispatch(fetchItems()); // Fetch all items initially
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;

  // Function to handle category click and switch view
  const handleCategoryClick = (categoryId) => {
    router.push(`/CustomerView/HomePage?category=${categoryId}`);
    setCurrentView("items"); // Switch to item view
  };

  // Determine which items to display
  let displayedItems = items;

  if (searchQuery && searchResults.length > 0) {
    // If there is a search query, display the search results
    displayedItems = searchResults;
  } else if (selectedCategory) {
    // If a category is selected, filter items by category
    displayedItems = items.filter(
      (item) => item.CATEGORY_ID === parseInt(selectedCategory)
    );
  }

  return (
    <Container className="home-container">
      <Row>
        <Col xs={12} sm={4} md={3} lg={3}>
          <div className="home-sidebar">
            <HomeSideBar />
          </div>
        </Col>
        <Col xs={12} sm={8} md={9} lg={9}>
          <div className="home-content">
            {/* Category View */}
            {currentView === "categories" && (
              <div className="category-grid">
                <HomeCategoryContainer onCategoryClick={handleCategoryClick} />
              </div>
            )}

            {/* Filter and Items View */}
            {currentView === "items" && (
              <>
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
                        <Button
                          style={{
                            color: "#025373",
                            textDecoration: "underline",
                            cursor: "pointer",
                            background: "none",
                            border: "none",
                            padding: "0",
                          }}
                          onClick={() => {
                            router.push("/CustomerView/HomePage");
                            setCurrentView("categories");
                          }}
                        >
                          Go back to the homepage
                        </Button>
                      </div>
                    )}
                  </Row>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeContent;
