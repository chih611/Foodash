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
import { fetchCartByCustomerId } from "../../../../../store/slices/cartSlice";

const HomeContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchQuery = router.query.search || ""; // Fetch search query from URL
  const selectedCategory = router.query.category || ""; // Fetch selected category from URL
  const customerId = useSelector(
    (state) => state.customer.profile?.CUSTOMER_ID
  );

  const { items, searchResults, status } = useSelector((state) => state.items);

  const [currentView, setCurrentView] = useState("categories");
  const [priceSort, setPriceSort] = useState(""); // Sorting by price
  const [nameSort, setNameSort] = useState(""); // Sorting by name

  useEffect(() => {
    dispatch(fetchItems());
    if (customerId) {
      dispatch(fetchCartByCustomerId(customerId)).then((action) => {
        if (action.payload) {
          console.log("Cart Items fetched:", action.payload);
        }
      });
    } else {
      console.log("No customerId available, managing cart locally");
    } // Fetch all items initially
  }, [dispatch]);

  // Listen for route changes and reset `currentView` when navigating back to homepage
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url === "/CustomerView/HomePage") {
        setCurrentView("categories");
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // Cleanup listener when component unmounts
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // Automatically switch to "items" view when search query is present
  useEffect(() => {
    if (searchQuery) {
      setCurrentView("items");
    }
  }, [searchQuery]);

  // Function to handle category click and switch view
  const handleCategoryClick = (categoryId) => {
    router.push(`/CustomerView/HomePage?category=${categoryId}`);
    setCurrentView("items"); // Switch to item view
  };

  // Sorting logic for price
  const handlePriceSort = (sortOrder) => {
    setPriceSort(sortOrder);
  };

  // Sorting logic for name
  const handleNameSort = (sortOrder) => {
    setNameSort(sortOrder);
  };

  // Function to clear all filters
  const handleClearAllFilters = () => {
    setPriceSort(""); // Reset price sorting
    setNameSort(""); // Reset name sorting
    dispatch(fetchItems()); // Fetch all items
    setCurrentView("categories"); // Reset to categories view
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

  // Apply sorting by price
  if (priceSort === "lowToHigh") {
    displayedItems.sort((a, b) => a.UNIT_PRICE - b.UNIT_PRICE);
  } else if (priceSort === "highToLow") {
    displayedItems.sort((a, b) => b.UNIT_PRICE - a.UNIT_PRICE);
  }

  // Apply sorting by name
  if (nameSort === "az") {
    displayedItems.sort((a, b) => a.ITEM_NAME.localeCompare(b.ITEM_NAME));
  } else if (nameSort === "za") {
    displayedItems.sort((a, b) => b.ITEM_NAME.localeCompare(a.ITEM_NAME));
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
                <HomeFilterBar
                  onPriceSort={handlePriceSort} // Pass sorting function for price
                  onNameSort={handleNameSort} // Pass sorting function for name
                  onClearFilters={handleClearAllFilters} // Pass function to clear all filters
                />
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
