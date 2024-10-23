import React from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  selectItems,
  clearSelectedItemModifications,
} from "../../../../../store/slices/itemsSlice";
import { useRouter } from "next/router";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import StarIcon from "@mui/icons-material/Star";

const HomeItemContainer = ({ item }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Dispatch the selected item to Redux
    dispatch(clearSelectedItemModifications());
    dispatch(selectItems(item));
    const itemId = item.ITEM_ID || 1;

    // Navigate to the item details page
    router.push("/CustomerView/ItemDetails/?itemId=" + itemId);
  };

  const getItemImageSrc = () => {
    if (item.PICTURE?.data) {
      // Convert ASCII values to a string (file path)
      const filePath = String.fromCharCode(...item.PICTURE.data);
      // Construct the correct URL to access the image
      return `http://localhost:8080/${filePath}`; // Adjust to your server URL
    } else {
      return "/birthdaycake_cate.jpg"; // Default fallback image
    }
  };

  // const getItemImageSrc = () => {
  //   if (item.PICTURE?.data) {
  //     // Convert the ASCII codes to a string path
  //     const filePath = String.fromCharCode(...item.PICTURE.data);
  //     return `http://localhost:8080/uploads/others/${filePath}`; // Construct the full URL
  //   } else {
  //     return "/birthdaycake_cate.jpg"; // Default fallback image
  //   }
  // };

  const itemPicture = getItemImageSrc();

  return (
    <Col xs={6} md={6} lg={3} className="my-3">
      <Card className="product-card">
        <div className="card-img-container">
          <Card.Img variant="top" src={itemPicture} className="product-image" />
          {/* <img src={itemPicture} className="product-image" /> */}
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
