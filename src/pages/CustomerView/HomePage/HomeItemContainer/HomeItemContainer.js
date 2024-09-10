import React from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StarIcon from "@mui/icons-material/Star";

const HomeItemContainer = () => {
  return (
    <div className="item-container">
      <Col xs={6} sm={6} md={4} lg={3} className="my-3">
        <Card className="product-card">
          <div className="card-img-container">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150"
              className="product-image"
            />
          </div>
          <div className="product-rating">
            <StarIcon className="star-icon" />
            <span>4.9</span>
          </div>
          <Card.Body>
            <Card.Title className="product-title text-center">
              Club house Sandwich
            </Card.Title>

            <Row className="item-button align-items-center justify-content-between">
              <Col xs={6} className="text-center">
                <Card.Text className="product-price">from $13.5</Card.Text>
              </Col>
              <Col xs={3} className="text-center">
                <Button variant="link" className="icon-button">
                  <FavoriteBorderIcon className="icon" />
                </Button>
              </Col>
              <Col xs={3} className="text-center">
                <Button variant="link" className="icon-button">
                  <AddShoppingCartIcon className="icon" />
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default HomeItemContainer;
