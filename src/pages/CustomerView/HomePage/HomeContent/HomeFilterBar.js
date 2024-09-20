import React, { useEffect } from "react";
import { ButtonGroup, Dropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategories,
  fetchItemsByCategory,
} from "../../../../../store/slices/categorySlice";
import {
  selectAllCategories,
  selectCategoriesStatus,
  selectCategoriesError,
} from "../../../../../store/selector/selector";

const HomeFilterBar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const categoryStatus = useSelector(selectCategoriesStatus);
  const categoryError = useSelector(selectCategoriesError);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchAllCategories()); // Fetch all categories on mount
    }
  }, [dispatch, categoryStatus]);

  // Dispatch action to filter items by selected category
  const handleCategoryClick = (categoryName) => {
    dispatch(fetchItemsByCategory(categoryName)); // Fetch items by category
  };

  return (
    <div className="filters-section my-3">
      <ButtonGroup className="d-flex flex-wrap">
        <Dropdown as={ButtonGroup} className="mb-2 mb-md-0 me-2">
          <Dropdown.Toggle variant="outline-primary">
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
                  onClick={() => handleCategoryClick(category.CATEGORY_NAME)}
                >
                  {category.CATEGORY_NAME}
                </Dropdown.Item>
              ))}
            {categoryStatus === "failed" && (
              <Dropdown.Item>Error: {categoryError}</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>

        {/* You can add other filters here (Price Range, Name sorting, etc.) */}
        <Dropdown as={ButtonGroup} className="mb-2 mb-md-0 me-2">
          <Dropdown.Toggle variant="outline-primary">
            Price Range
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#action/3.1">Low to High</Dropdown.Item>
            <Dropdown.Item href="#action/3.2">High to Low</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>
    </div>
  );
};

export default HomeFilterBar;
