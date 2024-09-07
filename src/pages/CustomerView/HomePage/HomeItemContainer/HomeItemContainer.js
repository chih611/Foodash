import React from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const HomeItemContainer = () => {
  return (
    <Col md={3} className="my-3">
      <Card className="product-card">
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Title>Product Name</Card.Title>
          <Card.Text>from $12</Card.Text>
          <Row className="align-items-center">
            <Col>
              <Button variant="link">
                <FavoriteBorderIcon />
              </Button>
              <Button variant="link">
                <AddShoppingCartIcon />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default HomeItemContainer;
