import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchAllCategories } from "../../../../../store/slices/categorySlice";
import { selectAllCategories } from "../../../../../store/selector/selector";
import { Row, Col } from "react-bootstrap";

const HomeCategoryContainer = ({ onCategoryClick }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const categories = useSelector(selectAllCategories);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // Define a mapping for category names to background images
  const categoryImages = {
    eat: "/platter_cate.jpg",
    food: "/sanwich.jpg",
    drink: "/drink_cate.jpg",
    coffee: "/drink_cate.jpg",
  };

  return (
    <div className="container category-container">
      <Row className="home-category-container">
        {categories.map((category) => {
          const categoryKey = category.CATEGORY_NAME.toLowerCase(); // Use lowercase keys for matching
          const backgroundImage =
            categoryImages[categoryKey] || "https://via.placeholder.com/150"; // Default image

          return (
            <Col
              key={category.CATEGORY_ID}
              xs={12}
              sm={6}
              md={6}
              lg={6}
              className="my-3"
            >
              <div
                className="category-box"
                onClick={() => onCategoryClick(category.CATEGORY_ID)}
                style={{
                  cursor: "pointer",
                  position: "relative",
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "200px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <h3
                  className="category-title"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#fffffe",
                    color: "#f38b3c",
                    padding: "5px 10px",
                    borderRadius: "20px",
                  }}
                >
                  {category.CATEGORY_NAME}
                </h3>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default HomeCategoryContainer;
