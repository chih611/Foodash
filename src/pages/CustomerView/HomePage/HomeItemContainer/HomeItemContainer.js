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

  //fix itemImage binding with CloudinaryUrl
    const getItemImageSrc = () => {
    if (!item.PICTURE) {
      return "/birthdaycake_cate.jpg"; // Default image
    }
  
    // Clean the URL by removing any base64 prefix if it was accidentally added
    const cleanUrl = item.PICTURE.replace('data:image/png;base64,', '');
  
    // Handle Cloudinary URLs
    if (cleanUrl.includes('cloudinary.com')) {
      // Remove any remaining prefixes and return the clean Cloudinary URL
      return cleanUrl.replace(/^(data:image\/[^;]+;base64,)/, '');
    }
  
    // Handle actual base64 images (only if they're really base64)
    if (cleanUrl.startsWith('data:image')) {
      return cleanUrl;
    }
  
    // Handle local server images
    if (cleanUrl.startsWith('/')) {
      return `http://localhost:8080${cleanUrl}`;
    }
  
    // If it's already a full URL
    if (cleanUrl.startsWith('http')) {
      return cleanUrl;
    }
  
    // For any other case, assume it's a local path
    return `http://localhost:8080/${cleanUrl.replace(/^\/+/, '')}`;
  };

  // const getItemImageSrc = () => {
  //   if (item.PICTURE) {
  //     if (item.PICTURE.startsWith("data:image")) {
  //       return item.PICTURE; // Base64 case
  //     }
  //     return `http://localhost:8080${item.PICTURE}`;
  //   }
  //   return "/birthdaycake_cate.jpg"; // Default image if none
  // };


  const itemPicture = getItemImageSrc();
  // console.log("itemPicture", itemPicture);

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
          <Card.Title className="product-title text-center mb-4">
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
