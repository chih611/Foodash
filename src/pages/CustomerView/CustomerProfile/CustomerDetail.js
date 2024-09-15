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
          {/* Image Placeholder Section */}
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
          <Col xs={4} className="d-flex justify-content-begin">
            <Row>
              <Input type="email" label="Email" />
            </Row>
            
          </Col>
          <Col xs={4} className="d-flex justify-content-begin">
            <Input type="email" label="Email" placeholder="Enter your email"/>
          </Col>
          
        </Row>


      </Container>
        
        
      </div>  
    );
  };
  
  export default CustomerDetail;