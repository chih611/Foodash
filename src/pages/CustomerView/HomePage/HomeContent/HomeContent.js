import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  fetchIngredients,
  getAllModifications,
} from "../../../../../store/slices/itemsSlice";
import { Col, Row, Button, Container } from "react-bootstrap";
import HomeSideBar from "../HomeSideBar/HomeSideBar";
import HomeFilterBar from "./HomeFilterBar";
import HomeItemContainer from "../HomeItemContainer/HomeItemContainer";
import HomeCategoryContainer from "../HomeCategoryContainer/HomeCategoryContainer";
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

  const { items, searchResults, modifications } = useSelector(
    (state) => state.items
  );

  const [currentView, setCurrentView] = useState("categories");
  const [priceSort, setPriceSort] = useState(""); // Sorting by price
  const [nameSort, setNameSort] = useState(""); // Sorting by name
  const [selectedIngredients, setSelectedIngredients] = useState([]); // Track selected ingredients
  const [displayedItems, setDisplayedItems] = useState([]); // Local state for displayed items

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchIngredients());
    dispatch(getAllModifications());
    if (customerId) {
      dispatch(fetchCartByCustomerId(customerId)).then((action) => {
        if (action.payload) {
          console.log("Cart Items fetched:", action.payload);
        }
      });
    } else {
      console.log("No customerId available, managing cart locally");
    }
  }, [dispatch, customerId]);

  useEffect(() => {
    if (items.length > 0) {
      setDisplayedItems(items); // Initialize displayedItems with fetched items
    }
  }, [items]);

  console.log("Items:", items); // Log items before rendering

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url === "/CustomerView/HomePage") {
        setCurrentView("categories");
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (searchQuery) {
      setCurrentView("items");
    }
  }, [searchQuery]);

  const handleCategoryClick = (categoryId) => {
    router.push(`/CustomerView/HomePage?category=${categoryId}`);
    setCurrentView("items"); // Switch to item view
  };

  const getItemsByIngredientsAndLabels = (ingredients, itemsToFilter) => {
    const filteredItems = [];

    if (!Array.isArray(ingredients)) {
      console.error("Ingredients is not an array:", ingredients);
      return filteredItems;
    }

    modifications.forEach((mod) => {
      const modIngredients = mod.INGREDIENTS;

      if (
        Array.isArray(modIngredients) &&
        ingredients.some((ing) => modIngredients.includes(ing))
      ) {
        const item = itemsToFilter.find((item) => item.ITEM_ID === mod.ITEM_ID);
        if (item) {
          filteredItems.push(item);
        }
      }
    });

    return [...new Set(filteredItems)]; // Return unique filtered items
  };

  const handleFilterChange = (type, value, checked) => {
    if (type === "ingredients") {
      const updatedIngredients = checked
        ? [...selectedIngredients, value]
        : selectedIngredients.filter((ingredient) => ingredient !== value);

      setSelectedIngredients(updatedIngredients);
      console.log("Selected Ingredients after change:", updatedIngredients); // Log selected ingredients

      // Determine the items to filter based on the selected category
      const itemsToFilter = selectedCategory
        ? items.filter(
            (item) => item.CATEGORY_ID === parseInt(selectedCategory)
          )
        : items;

      // Get item objects based on selected ingredients
      const filteredItems = getItemsByIngredientsAndLabels(
        updatedIngredients,
        itemsToFilter
      );
      console.log("Filtered Items after change:", filteredItems);

      // If no ingredients are selected, show the original items
      if (filteredItems.length === 0) {
        setDisplayedItems(itemsToFilter); // Reset to original items
      } else {
        setDisplayedItems(filteredItems); // Update displayed items
      }
      setCurrentView("items"); // Ensure the view is set to items
    } else {
      setDisplayedItems(items); // Reset to original items
    }
  };

  const handlePriceSort = (sortOrder) => {
    setPriceSort(sortOrder);
  };

  const handleNameSort = (sortOrder) => {
    setNameSort(sortOrder);
  };

  const handleClearAllFilters = () => {
    setPriceSort(""); // Reset price sorting
    setNameSort(""); // Reset name sorting
    setSelectedIngredients([]); // Reset ingredient filters
    setDisplayedItems(items); // Reset displayed items to the full list
    dispatch(fetchItems()); // Fetch all items
    setCurrentView("categories"); // Reset to categories view
  };

  let finalDisplayedItems = displayedItems; // Use the local displayedItems state

  if (selectedIngredients.length > 0) {
    // Determine the items to filter based on the selected category
    const itemsToFilter = selectedCategory
      ? items.filter((item) => item.CATEGORY_ID === parseInt(selectedCategory))
      : items;

    // Filter items based on selected ingredients
    finalDisplayedItems = getItemsByIngredientsAndLabels(
      selectedIngredients,
      itemsToFilter
    );
  } else if (searchQuery && searchResults.length > 0) {
    finalDisplayedItems = searchResults;
  } else if (selectedCategory) {
    finalDisplayedItems = items.filter(
      (item) => item.CATEGORY_ID === parseInt(selectedCategory)
    );
  }

  if (priceSort === "lowToHigh") {
    finalDisplayedItems.sort((a, b) => a.UNIT_PRICE - b.UNIT_PRICE);
  } else if (priceSort === "highToLow") {
    finalDisplayedItems.sort((a, b) => b.UNIT_PRICE - a.UNIT_PRICE);
  }

  if (nameSort === "az") {
    finalDisplayedItems.sort((a, b) => a.ITEM_NAME.localeCompare(b.ITEM_NAME));
  } else if (nameSort === "za") {
    finalDisplayedItems.sort((a, b) => b.ITEM_NAME.localeCompare(a.ITEM_NAME));
  }

  console.log("Final Displayed Items:", finalDisplayedItems); // Log final displayed items before rendering

  return (
    <Container className="home-container">
      <Row>
        <Col xs={12} sm={4} md={3} lg={3}>
          <div className="home-sidebar">
            <HomeSideBar onFilterChange={handleFilterChange} />
          </div>
        </Col>
        <Col xs={12} sm={8} md={9} lg={9}>
          <div className="home-content">
            {currentView === "categories" && (
              <div className="category-grid">
                <HomeCategoryContainer onCategoryClick={handleCategoryClick} />
              </div>
            )}
            {currentView === "items" && (
              <>
                <HomeFilterBar
                  onPriceSort={handlePriceSort}
                  onNameSort={handleNameSort}
                  onClearFilters={handleClearAllFilters}
                  onCategoryChange={handleCategoryClick} // Pass the category change handler
                />
                <div className="homeContentSection">
                  <Row>
                    {finalDisplayedItems.length > 0 ? (
                      finalDisplayedItems.map((item) => (
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
