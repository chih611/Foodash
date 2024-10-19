import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { fetchOrderByCustomerId } from "../../../../store/actions/orderAction";
import { fetchBoughtBeforeByCustomerId } from "../../../../store/actions/orderDetailAction";
import { fetchItems } from "../../../../store/slices/itemsSlice";
import { fetchAllCategories } from "../../../../store/slices/categorySlice";
import HomeDirectionLink from "../HomePage/HomeDirectionLink/HomeDirectionLink";
import HomePageNavBar from "../HomePage/HomePageNavBar";
import Link from "next/link";
import { ArrowBackRounded } from "@mui/icons-material";
import Section from "./Section";

const BoughtBefore = () => {
  const customerId = useSelector(
    (state) => state.customer.profile?.CUSTOMER_ID
  );
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (customerId) {
      dispatch(fetchAllCategories());
      dispatch(fetchOrderByCustomerId(customerId));
      dispatch(fetchBoughtBeforeByCustomerId(customerId));
      dispatch(fetchItems());
    }
  }, [customerId, dispatch]);

  const orderByCustomer = useSelector(
    (state) => state.order.orderListByCustomerId
  );
  const allCategories = useSelector((state) => state.category.categories);
  const uniqueItems = useSelector((state) => state.orderDetail.uniqueItems);
  const allItems = useSelector((state) => state.items.items);

  // Helper function to merge data based on ITEM_ID
  const getFullItemDetails = (uniqueItem) => {
    const completeItem = allItems.find(
      (item) => item.ITEM_NAME === uniqueItem.Product
    );
    return completeItem ? { ...uniqueItem, ...completeItem } : uniqueItem;
  };

  // Generate the final array of items with merged data
  const mergedItems = uniqueItems.map(getFullItemDetails);

  // Group mergedItems by category
  const groupItemsByCategory = () => {
    const itemsByCategory = {};
    mergedItems.forEach((item) => {
      const categoryId = item.CATEGORY_ID;
      if (!itemsByCategory[categoryId]) {
        itemsByCategory[categoryId] = [];
      }
      itemsByCategory[categoryId].push(item);
    });
    return itemsByCategory;
  };

  const itemsByCategory = groupItemsByCategory();

  if (!orderByCustomer || orderByCustomer.length === 0) {
    return (
      <div>
        You have not purchased any item
        <Link href="/CustomerView/HomePage/" passHref>
          Make your first order
        </Link>
      </div>
    );
  }

  return (
    <Container className="bought-before-container">
      <Row>
        <HomePageNavBar />
      </Row>
      <Row>
        <HomeDirectionLink />
      </Row>
      <main>
        <Row className="d-none justify-content-center d-lg-flex">
          <div className="col-md-1">
            <Link href="/CustomerView/HomePage/" legacyBehavior passHref>
              <a className="d-flex align-items-center text-decoration-none">
                <div className="account-button me-2">
                  <ArrowBackRounded sx={{ color: "#025373" }} />
                </div>
              </a>
            </Link>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-7">
            <h1>Bought Before</h1>
          </div>
        </Row>
        <Row>
          {/* Dynamically render categories and their items */}
          {allCategories.map((category) => (
            <Section
              key={category.CATEGORY_ID}
              title={category.CATEGORY_NAME}
              items={itemsByCategory[category.CATEGORY_ID]}
            />
          ))}
        </Row>
      </main>
    </Container>
  );
};

export default BoughtBefore;
