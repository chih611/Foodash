import React from "react";
import { useSelector } from "react-redux";
import { Col, Row, Nav, Container, Button } from "react-bootstrap";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useRouter } from "next/router";

const ItemsInformation = () => {
  const router = useRouter();

  // Get the selected item from Redux
  const selectedItem = useSelector((state) => state.items.selectedItem);

  if (!selectedItem) {
    return (
      <div className="item-information">
        <Container
          fluid
          className="px-3 px-md-5 py-5"
          style={{ marginTop: "24px" }}
        >
          <Row>
            <Col>
              <h2>Please choose an item</h2>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  const parsedIngredients =
    typeof selectedItem.INGREDIENTS === "string"
      ? JSON.parse(selectedItem.INGREDIENTS)
      : selectedItem.INGREDIENTS;

  const parsedLabels =
    typeof selectedItem.LABELS === "string"
      ? JSON.parse(selectedItem.LABELS)
      : selectedItem.LABELS;

  const handleAddToCart = () => {
    router.push("/CustomerView/ItemModification/ItemModification");
  };

  return (
    <div className="item-information">
      <Container
        fluid
        className="px-3 px-md-5 py-5"
        style={{ marginTop: "24px" }}
      >
        <Row>
          {/* Image Section */}
          <Col xs={12} md={5} className="d-flex justify-content-center">
            <div
              style={{
                width: "100%",
                maxWidth: "342px",
                height: "342px",
                backgroundColor: "#e0e0e0",
                borderRadius: "50%",
                position: "relative",
              }}
            >
              {/* Image Placeholder */}
            </div>
          </Col>

          {/* Text Section */}
          <Col xs={12} md={7} className="mb-4">
            <h1 className="item-title">{selectedItem.ITEM_NAME}</h1>
            <Nav className="mb-2">
              {parsedLabels
                ? parsedLabels.map((label, index) => (
                    <Nav.Item key={index}>
                      <Nav.Link className="category-tab">{label}</Nav.Link>
                    </Nav.Item>
                  ))
                : `No labels available`}
            </Nav>

            <div className="price-section">
              <h3>${selectedItem.PRICE}</h3>
            </div>
            <h5 className="ingredients-title">Description</h5>

            <p className="description">
              {selectedItem.DESCRIPTION
                ? selectedItem.DESCRIPTION
                : `A triple-decker sandwich made up of three
              slices toasted white bread, deli-sliced turkey or chicken, fried
              bacon, lettuce, tomatoes, and mayonnaise`}
            </p>

            <h5 className="ingredients-title">Ingredients & Recipes</h5>
            <Row className="ingredients-list">
              {parsedIngredients &&
                Object.entries(parsedIngredients).map(
                  ([ingredient, amount], index) => (
                    <Col key={index}>
                      {ingredient}: {amount}
                    </Col>
                  )
                )}
            </Row>

            <Row className="action-buttons mt-3">
              <Col xs={5} md={5}>
                <Button variant="outline-primary" className="cart-btn">
                  <Row>
                    <Col xs={3}>
                      <Inventory2OutlinedIcon />
                    </Col>
                    <Col xs={9}>Order Now</Col>
                  </Row>
                </Button>
              </Col>
              <Col xs={5} md={5}>
                <Button
                  variant="outline-primary"
                  className="cart-btn"
                  onClick={handleAddToCart}
                >
                  <Row>
                    <Col xs={3}>
                      <AddShoppingCartIcon />
                    </Col>
                    <Col xs={9}>Add to cart</Col>
                  </Row>
                </Button>
              </Col>
              <Col xs={2} md={2}>
                <Button variant="outline-danger" className="wishlist-btn">
                  <FavoriteBorderOutlinedIcon />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ItemsInformation;
