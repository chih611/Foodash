import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Col, Row, Nav, Container, Button } from "react-bootstrap";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PrimaryButton from "../ViewCart/_PrimaryButton";
import {
  getItemModificationAndLabel,
  getAllLabels,
} from "../../../../store/slices/itemsSlice";
import { useRouter } from "next/router";

const ItemsInformation = () => {
  const router = useRouter();
  const itemId = router.query.itemId;

  const dispatch = useDispatch();

  // Fetch the item details by itemId
  useEffect(() => {
    if (itemId) {
      dispatch(getItemModificationAndLabel(itemId));
      dispatch(getAllLabels());
    }
  }, [itemId, dispatch]);

  // Get the selected item from Redux
  const selectedItem = useSelector((state) => state.items.selectedItem);
  const selectedItemModifications = useSelector(
    (state) => state.items.selectedItemModifications
  );

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

  // Ensure that we're correctly parsing the modifications and ingredients
  const parsedModifications = selectedItemModifications?.map((mod) => ({
    modification: mod.MODIFICATION,
    ingredients: mod.INGREDIENTS || [], // Default to an empty array if ingredients are null
  }));

  // console.log("parsedModifications", parsedModifications);

  // Render only the ingredients for the current modification in the loop
  const renderModifications = parsedModifications?.map(
    (mod, index) => (
      // console.log("mod", mod),
      (
        <div key={index}>
          <strong>{mod.modification}</strong>:{" "}
          {mod.ingredients?.join(", ") || "No ingredients available"}
        </div>
      )
    )
  );

  const parsedLabels =
    typeof selectedItem.LABELS === "string"
      ? JSON.parse(selectedItem.LABELS)
      : selectedItem.LABELS;

  const handleAddToCart = () => {
    router.push(
      "/CustomerView/ItemModification/?itemId=" + selectedItem.ITEM_ID
    );
  };

  //Parse the Item image
  const getItemImageSrc = () => {
    try {
    if (!selectedItem?.PICTURE) {
      return "/birthdaycake_cate.jpg";
    }

    // Clean the URL if it has a base64 prefix
    const cleanUrl = selectedItem.PICTURE.replace('data:image/png;base64,', '');

    // Return Cloudinary URL directly if it exists
    if (cleanUrl.includes('cloudinary.com')) {
      return cleanUrl;
    }

    // For local images
    return `http://localhost:8080${cleanUrl}`;

  } catch (error) {
    console.error('Error getting image source:', error);
    return "/birthdaycake_cate.jpg";
  }
};

  return (
    <div className="item-information">
      <Container
        fluid
        className="px-3 px-md-5 py-5"
      >
        <Row>
          {/* Image Section */}
          <Col xs={12} md={5} className="d-flex justify-content-center mb-5">
            <div>
              <img
                src={getItemImageSrc()}
                alt="item"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  height: "342px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "50%",
                  position: "relative",
                }}
              />
            </div>
          </Col>

          {/* Text Section */}
          <Col xs={12} md={7}>
            <h1 className="item-title">{selectedItem.ITEM_NAME}</h1>
            <Nav className="mb-2">
              {parsedLabels
                ? parsedLabels.map((label, index) => (
                    <Nav.Item key={index}>
                      <Nav.Link className="category-tab">{label}</Nav.Link>
                    </Nav.Item>
                  ))
                : ``}
            </Nav>

            <div className="price-section">
              <h5>${selectedItem.UNIT_PRICE}, exclusive of GST.</h5>
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
            <Row className="ingredients-list">{renderModifications}</Row>

            <Row className="action-buttons mt-4">
              <Col xs={5} md={5}>
                <PrimaryButton
                  onClick={handleAddToCart}
                  icon={Inventory2OutlinedIcon}
                  text="Order Now"
                />
              </Col>
              <Col xs={6} md={5}>
                <PrimaryButton
                  onClick={handleAddToCart}
                  icon={AddShoppingCartIcon}
                  text="Add to Cart"
                  inverted={true}
                />
              </Col>
              <Col xs={1} md={2}>
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
