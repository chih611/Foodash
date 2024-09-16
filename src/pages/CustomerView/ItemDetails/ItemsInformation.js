import React from "react";
import { Col, Row, Nav, Container, Button } from "react-bootstrap";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useRouter } from "next/router";

const ItemsInformation = ({ item }) => {
  const router = useRouter();

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
            <h1 className="item-title">{item.ITEM_NAME}</h1>
            <Nav className="mb-2">
              <Nav.Item>
                <Nav.Link className="category-tab">Quick food cooking</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="category-tab">Processed Meats</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="category-tab">Daily</Nav.Link>
              </Nav.Item>
            </Nav>

            <div className="price-section">
              <h3 className="price">$13.5/pack</h3>
              <h4 className="multi-pack-price">$38.2/3 packs</h4>
            </div>
            <h5 className="ingredients-title">Description</h5>

            <p className="description">
              A triple-decker sandwich made up of three slices toasted white
              bread, deli-sliced turkey or chicken, fried bacon, lettuce,
              tomatoes, and mayonnaise.
            </p>

            <h5 className="ingredients-title">Ingredients & Recipes</h5>
            <Row className="ingredients-list">
              <Col>Deli-sliced smoky meats: 0.3kg</Col>
              <Col>Lettuce: 0.1kg</Col>
              <Col>Fried Eggs: 2</Col>
              <Col>Tomatoes: 2</Col>
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
