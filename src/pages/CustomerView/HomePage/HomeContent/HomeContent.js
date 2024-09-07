import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import HomeSideBar from "../HomeSideBar/HomeSideBar";
import { Menu } from "@mui/icons-material";

const HomeContent = () => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/item");
      console.log("home", response);
      setItems(response.data.rows || []); // Ensure response.data.row is an array
    } catch (err) {
      console.log(err);
      setItems([]); // Set items to an empty array in case of error
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  // Define editItem and deleteItem functions

  return (
    <div className="container">
      <Row>
        <Col xs={12} sm={6} md={5} lg={3}>
          <div className="home-sidebar">
            <HomeSideBar />
          </div>
        </Col>
        <Col xs={12} sm={6} md={7} lg={9}>
          <div className="home-content">
            <h1>Home Content</h1>
            <ul>
              {items ? (
                items.map((item) => <li key={item.itemId}>{item.itemName}</li>)
              ) : (
                <li>No items available</li>
              )}
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomeContent;
