import React from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { selectItems } from "../../../../../store/slices/itemsSlice";
import { useRouter } from "next/router";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import StarIcon from "@mui/icons-material/Star";

const HomeItemContainer = ({ item }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Dispatch the selected item to Redux
    dispatch(selectItems(item));

    // Navigate to the item details page
    router.push("/CustomerView/ItemDetails/ItemDetails");
  };

  return (
    <Col xs={6} md={3} className="my-3">
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
            {item.ITEM_NAME || "Product Name"}
          </Card.Title>
          <Row className="item-button align-items-center justify-content-between">
            <Col xs={6} className="text-center">
              <Card.Text className="product-price">
                {item.UNIT_PRICE ? `$${item.UNIT_PRICE}` : "Price Unavailable"}
              </Card.Text>
            </Col>
            <Col xs={3} className="text-center">
              <Button variant="link" className="icon-button">
                <FavoriteBorderIcon className="icon" />
              </Button>
            </Col>
            <Col xs={3} className="text-center">
              <Button
                variant="link"
                className="icon-button"
                onClick={handleAddToCart}
              >
                <AddShoppingCartIcon className="icon" />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default HomeItemContainer;
