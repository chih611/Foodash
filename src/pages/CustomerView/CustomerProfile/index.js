import { useState } from "react";
import HomePageNavBar from "../HomePage/HomePageNavBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomInput from "./CustomInput"; // Import the reusable CustomInput component
import EditRounded from "@mui/icons-material/EditRounded";
import { clearProfile } from "../../../../store/slices/customerSlice";
import PrimaryButton from "../ViewCart/PrimaryButton";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";

const CustomerDetail = () => {
  const customerProfile = useSelector((state) => state.customer.profile);
  const [f_name, setFName] = useState("");
  const [l_name, setLName] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignOut = async () => {
    await dispatch(clearProfile());
    await router.push("/CustomerView/HomePage");
  };

  return (
    <div>
      {customerProfile &&
      customerProfile.CUSTOMER_TYPE.toLowerCase() === "user" ? (
        <Container fluid className="px-3 px-md-5 py-5">
          <div className="navBar" style={{ marginBottom: "150px" }}>
            <HomePageNavBar />
          </div>

          {/* Avatar and Form Fields in the Same Row */}
          <Row className="align-items-start justify-content-center">
            {/* Avatar Section */}
            <Col
              xs={12}
              md={6}
              className="d-flex justify-content-center position-relative mb-3 mb-md-0"
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: "342px",
                  height: "342px",
                  backgroundColor: "#e0e0e0",
                }}
              >
                {/* Image Placeholder */}
              </div>
              <EditRounded
                sx={{ color: "#025373" }}
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  cursor: "pointer",
                }}
              />
            </Col>

            {/* Form Fields Section */}
            <Col xs={12} md={6}>
              <Row>
                {/* First Name and Last Name */}
                <Col xs={12} md={6} className="mb-3">
                  <CustomInput
                    label="First Name"
                    placeholder={
                      customerProfile
                        ? customerProfile.FIRST_NAME
                        : "First Name"
                    }
                    value={f_name}
                    onChange={(e) => setFName(e.target.value)}
                  />
                </Col>
                <Col xs={12} md={6} className="mb-3">
                  <CustomInput
                    label="Last Name"
                    placeholder={
                      customerProfile ? customerProfile.LAST_NAME : "Last Name"
                    }
                    value={l_name}
                    onChange={(e) => setLName(e.target.value)}
                  />
                </Col>

                {/* Company Name and ABN */}
                <Col xs={12} md={6} className="mb-3">
                  <CustomInput
                    label="Company Name"
                    placeholder={
                      customerProfile
                        ? customerProfile.FIRST_NAME
                        : "Company Name"
                    }
                  />
                </Col>
                <Col xs={12} md={6} className="mb-3">
                  <CustomInput
                    placeholder={customerProfile ? customerProfile.ABN : "ABN"}
                    label="ABN"
                  />
                </Col>

                {/* Email and Phone */}
                <Col xs={12} md={6} className="mb-3">
                  <CustomInput
                    label="Email"
                    placeholder={
                      customerProfile ? customerProfile.EMAIL : "EMAIL"
                    }
                    type="email"
                  />
                </Col>
                <Col xs={12} md={6} className="mb-3">
                  <CustomInput
                    label="Phone"
                    placeholder={
                      customerProfile
                        ? customerProfile.PHONE_NUMBER
                        : "Phone Number"
                    }
                    type="tel"
                  />
                </Col>

                {/* Billing Address Section */}
                <Col xs={12} md={6} className="mb-3">
                  <CustomInput label="Address 1" type="text" />
                </Col>
                <Col xs={12} md={6} className="mb-3">
                  <CustomInput label="City/Suburb" type="text" />
                </Col>
                <Col xs={12} md={6} className="mb-3">
                  <CustomInput label="State" type="text" />
                </Col>
                <Col xs={12} md={6} className="mb-3">
                  <CustomInput label="Postcode" type="text" />
                </Col>
              </Row>

              <Row className="justify-content-center mt-4">
                <Col xs={12} md={6}>
                  <Link href="/CustomerView/HomePage/" legacyBehavior passHref>
                    <a className="w-100">
                      <Button variant="primary" className="w-100">
                        Save your profile
                      </Button>
                    </a>
                  </Link>
                </Col>
                <Col xs={12} md={6} className="mt-2 mt-md-0">
                  <PrimaryButton
                    variant="red"
                    icon={LogoutIcon}
                    text="Sign Out"
                    onClick={handleSignOut}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Save and Sign Out Buttons */}
        </Container>
      ) : (
        <div
          className="no-items-found text-center"
          style={{ marginTop: "20px" }}
        >
          <HomePageNavBar />
          <p>It seems like you are not logged in</p>
          <button
            style={{
              color: "#025373",
              textDecoration: "underline",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: "0",
            }}
            onClick={() => router.push("/CustomerView/SignIn")}
          >
            Please Sign In to access this content
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerDetail;
