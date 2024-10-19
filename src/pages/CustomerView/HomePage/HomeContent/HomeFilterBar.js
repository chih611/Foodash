import React, { useEffect } from "react";
import { ButtonGroup, Dropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategories,
  fetchItemsByCategory,
  clearCategoryFilter,
} from "../../../../../store/slices/categorySlice";
import { fetchItems } from "../../../../../store/slices/itemsSlice";
import {
  selectAllCategories,
  selectCategoriesStatus,
  selectCategoriesError,
} from "../../../../../store/selector/selector";
import { useRouter } from "next/router";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import SortByAlphaOutlinedIcon from "@mui/icons-material/SortByAlphaOutlined";

const HomeFilterBar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const categoryStatus = useSelector(selectCategoriesStatus);
  const categoryError = useSelector(selectCategoriesError);
  const router = useRouter();

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchAllCategories()); // Fetch all categories on mount
    }
  }, [dispatch, categoryStatus]);

  // Dispatch action to filter items by selected category
  const handleCategoryClick = (categoryId) => {
    dispatch(fetchItemsByCategory(categoryId)); // Fetch items by category
    router.push(`/CustomerView/HomePage?category=${categoryId}`); // Update URL with category filter
  };

  // Dispatch action to clear category filter and fetch all items
  const handleClearFilter = () => {
    dispatch(clearCategoryFilter()); // Clear category filter
    dispatch(fetchItems()); // Fetch all items after clearing filter
  };

  return (
    <div className="filters-section my-3">
      <ButtonGroup className="d-flex flex-wrap">
        <Dropdown as={ButtonGroup} className="filter-button mb-2 mb-md-0 me-2">
          <Dropdown.Toggle
            variant="outline-primary"
            className="d-flex align-items-center custom-filter-button"
          >
            <FilterAltOutlinedIcon
              className="me-1"
              style={{ color: "#8f5652" }}
            />
            Categories
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {categoryStatus === "loading" && (
              <Dropdown.Item>Loading...</Dropdown.Item>
            )}
            {categoryStatus === "succeeded" &&
              categories.map((category) => (
                <Dropdown.Item
                  key={category.CATEGORY_ID}
                  onClick={() => handleCategoryClick(category.CATEGORY_ID)}
                >
                  {category.CATEGORY_NAME}
                </Dropdown.Item>
              ))}
            {categoryStatus === "failed" && (
              <Dropdown.Item>Error: {categoryError}</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>

        {/* Price Range Filter */}
        <Dropdown as={ButtonGroup} className="filter-button mb-2 mb-md-0 me-2">
          <Dropdown.Toggle
            variant="outline-primary"
            className="d-flex align-items-center custom-filter-button"
          >
            <SortOutlinedIcon className="me-1" style={{ color: "#8f5652" }} />
            Price Range
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#action/3.1">Low to High</Dropdown.Item>
            <Dropdown.Item href="#action/3.2">High to Low</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Name Sorting Filter */}
        <Dropdown as={ButtonGroup} className="filter-button mb-2 mb-md-0 me-2">
          <Dropdown.Toggle
            variant="outline-primary"
            className="d-flex align-items-center custom-filter-button"
          >
            <SortByAlphaOutlinedIcon
              className="me-1"
              style={{ color: "#8f5652" }}
            />
            Name (A–Z)
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#action/3.3">A–Z</Dropdown.Item>
            <Dropdown.Item href="#action/3.4">Z–A</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Clear Filter Button */}
        <Button variant="outline-danger" onClick={handleClearFilter}>
          Clear Filter
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default HomeFilterBar;
