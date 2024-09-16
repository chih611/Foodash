import { useState, useEffect } from "react";
import HomePageNavBar from "../HomePage/HomePageNavBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomInput from "./CustomInput";  // Import the reusable CustomInput component
import EditRounded from "@mui/icons-material/EditRounded";
import Link from "next/link";

const CustomerDetail = () => {
  const [f_name, setFName] = useState('');
  const [l_name, setLName] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('your-api-url');
      const data = await response.json();
      // Assuming you update `contact` with this data
      setContact(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Container fluid className="px-3 px-md-5 py-5" style={{ marginTop: "24px" }}>
        <div className="navBar" style={{ marginBottom: "48px" }}>
          <HomePageNavBar />
        </div>

        <Row>
          <Col xs={12} md={4} className="d-flex justify-content-center">
            <div style={{ width: "100%", maxWidth: "342px", height: "342px", backgroundColor: "#e0e0e0", marginTop: "24px" }}>
              {/* Image Placeholder */}
            </div>
          </Col>     
        </Row>
        <Row className="d-flex justify-content-end">
          <Col className="d-flex flex-row-reverse bd-highlight" > 
            <EditRounded sx={{ color: "#025373" }}/>
          </Col>
          
        </Row>

        {/* Form Section */}
        <Row>
          <div style={{ width: "100%", marginTop: "48px" }}>
            <div className="d-flex justify-content-center flex-wrap">
              <CustomInput
                label="First Name"
                value={f_name}
                onChange={(e) => setFName(e.target.value)}
              />
              <CustomInput
                label="Last Name"
                value={l_name}
                onChange={(e) => setLName(e.target.value)}
              />
            </div>
          </div>

          <div style={{ width: "100%", marginTop: "24px" }}>
            <Col className="d-flex justify-content-center">
              <CustomInput label="Company Name" />
              <CustomInput label="ABN" />
            </Col>
          </div>

          <div style={{ width: "100%", marginTop: "24px" }}>
            <Col className="d-flex justify-content-center">
              <CustomInput label="Email" placeholder="Enter your email" type="email" />
              <CustomInput label="Phone" placeholder= "+61" type="number"/>
            </Col>
          </div>

          
          <div style={{ width: "100%", marginTop: "24px" }}>
            <div className="d-flex justify-content-begin">
              <p className="subtitle mb-0">Billing Address</p>
            </div>
            <div style={{ width: "100%", marginBottom: "24px", borderBottomColor: "black" }} >

            </div>
            <Col className="d-flex justify-content-center">              
              <CustomInput label="Address 1" type="text" />
              <CustomInput label="City/Surburb" type="text" />
            </Col>
            <Col className="d-flex justify-content-center">              
              <CustomInput label="State" type="text" />
              <CustomInput label="Postcode" type="text" />
            </Col>
          </div>

          <div className="w-100 d-flex justify-content-center" style={{ width: "100%", marginTop: "24px" }}>
            <Link
                href="/CustomerView/HomePage/HomePage"
                legacyBehavior
                passHref>
              <a className="w-100">
                <Button variant="primary" className="w-100">Save your profile</Button>
              </a>
            </Link>
          </div>
        </Row>

       
      </Container>
    </div>
  );
};

export default CustomerDetail;
