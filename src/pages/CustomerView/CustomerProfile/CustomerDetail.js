import {Input} from "@nextui-org/input";
import { useState, useEffect } from "react";
import HomePageNavBar from "../HomePage/HomePageNavBar";
import {
  Container,
  Row,
  Col,
  Navbar,
  Button,
} from "react-bootstrap";

const CustomerDetail = () => {

  const [f_name, setFName] = useState('');
  const [l_name, setLName] = useState('');
  const [contact, setContact] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('your-api-url');
      const data = await response.json();
      setList(data);
    }

    fetchData();
  }, []);

    return (
      <div bg="white" expand="lg">
        <Container
        fluid
        className="px-3 px-md-5 py-5" // Adjusted padding for mobile and desktop
        style={{ marginTop: "24px" }}
      >
        <div
        className="navBar"
        style={{
          marginBottom: "48px",
        }}
      >
        <HomePageNavBar />
        </div>

        <Row > 
          {/* Avatar Image */}
          <Col xs={12} md={4} className="d-flex justify-content-center">
            <div
              style={{
                width: "100%",
                maxWidth: "342px",
                height: "342px",
                backgroundColor: "#e0e0e0",
                marginTop: "24px",
              }}
            >
              {/* Image Placeholder */}
            </div>
          </Col>
        </Row>
        <Row className="form-section">
          <div
              style={{
                width: "100%",
                marginTop: "24px",
              }}
              >

            <Col className="d-flex justify-content-center">
              <Input className = "form_item" type="text" label="First Name"/> 
              <Input className = "form_item" type="text" label="Last Name" />          
            </Col>
          </div>
          <div
              style={{
                width: "100%",
                marginTop: "24px",
              }}
              >

            <Col className="d-flex justify-content-center">
              <Input className = "form_item" type="text" label="Company Name"/> 
              <Input className = "form_item" type="text" label="ABN"/>          
            </Col>
          </div>
          <div
              style={{
                width: "100%",
                marginTop: "24px",
              }}
              >

            <Col className="d-flex justify-content-center">
              <Input className = "form_item" type="date" label="Date of Birth"/> 
              <Input className = "form_item" type="text" label="Gender"/>          
            </Col>
          </div>

          <div
              style={{
                width: "100%",
                marginTop: "24px",
              }}
              >

            <Col className="d-flex justify-content-center">
              <Input className = "form_item" type="email" label="Contact" placeholder="Enter your email"/> 
              <Input className = "form_item" type="email" label="Type" />   
              {/* // adjust list drop down after */}
            </Col>
          </div>
          
        </Row>
      </Container>            
    </div>  
    );
  };
  
  export default CustomerDetail;