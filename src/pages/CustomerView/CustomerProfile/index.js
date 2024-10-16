import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomInput from "./CustomInput";
import EditRounded from "@mui/icons-material/EditRounded";
import {
  clearProfile,
  updateCustomer,
} from "../../../../store/slices/customerSlice";
import PrimaryButton from "../ViewCart/_PrimaryButton";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import HomePageNavBar from "../HomePage/HomePageNavBar";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { clearCart } from "../../../../store/slices/cartSlice";

// Yup validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City/Suburb is required"),
  state: yup.string().required("State is required"),
  postcode: yup.string().required("Postcode is required"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  gender: yup.string().required("Gender is required"),
});

const CustomerDetail = () => {
  const customerProfile = useSelector((state) => state.customer.profile);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: customerProfile?.FIRST_NAME || "",
      lastName: customerProfile?.LAST_NAME || "",
      companyName: customerProfile?.COMPANY_NAME || "",
      abn: customerProfile?.ABN || "",
      email: customerProfile?.EMAIL || "",
      phone: customerProfile?.PHONE_NUMBER || "",
      address: customerProfile?.ADDRESS || "",
      city: customerProfile?.CITY || "",
      state: customerProfile?.STATE || "",
      postcode: customerProfile?.POSTCODE || "",
      dateOfBirth: customerProfile?.DATE_OF_BIRTH || "",
      gender: customerProfile?.GENDER || "",
    },
  });

  // Log initial profile data
  useEffect(() => {
    console.log("Initial Profile Data:", customerProfile);
  }, [customerProfile]);

  const onSubmit = async (data) => {
    try {
      const customerId = customerProfile?.CUSTOMER_ID;
      if (!customerId) {
        console.error("Customer ID not found.");
        return;
      }

      // Combine existing and updated data
      const updatedCustomerData = {
        ...customerProfile, // Retain existing data
        ...data, // Merge with new data from form
        dateOfBirth: new Date(data.dateOfBirth).toISOString().split("T")[0],
      };

      console.log("Data before update:", updatedCustomerData);

      // Dispatch the update customer action
      await dispatch(
        updateCustomer({ customerId, updatedData: updatedCustomerData })
      );

      console.log("Profile Updated:", updatedCustomerData);

      // Redirect to homepage after successful update
      await router.push("/CustomerView/HomePage");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleSignOut = async () => {
    await dispatch(clearProfile());
    await dispatch(clearCart());
    await router.push("/CustomerView/");
  };

  return (
    <div>
      {customerProfile && customerProfile.CUSTOMER_TYPE === "user" ? (
        <Container
          fluid
          className="px-3 px-md-5 py-5"
          style={{ marginTop: "24px" }}
        >
          <div className="navBar" style={{ marginBottom: "150px" }}>
            <HomePageNavBar />
          </div>
          <Row className="align-items-center justify-content-center">
            <Col xs={12} md={6} className="text-center mb-4">
              <div
                style={{
                  width: "342px",
                  height: "342px",
                  backgroundColor: "#e0e0e0",
                  position: "relative",
                  margin: "0 auto",
                }}
              >
                <EditRounded
                  sx={{
                    color: "#025373",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </Col>

            {/* Form Section */}
            <Col xs={12} md={6}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col xs={12} md={6}>
                    <CustomInput
                      label="First Name"
                      {...register("firstName")}
                      error={errors.firstName}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <CustomInput
                      label="Last Name"
                      {...register("lastName")}
                      error={errors.lastName}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <CustomInput
                      label="Company Name"
                      {...register("companyName")}
                      error={errors.companyName}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <CustomInput
                      label="ABN"
                      {...register("abn")}
                      error={errors.abn}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <CustomInput
                      label="Email"
                      type="email"
                      {...register("email")}
                      error={errors.email}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <CustomInput
                      label="Phone"
                      {...register("phone")}
                      error={errors.phone}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <CustomInput
                      label="Date of Birth"
                      type="date"
                      {...register("dateOfBirth")}
                      error={errors.dateOfBirth}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <CustomInput
                      label="Gender"
                      {...register("gender")}
                      error={errors.gender}
                    />
                  </Col>
                </Row>

                {/* Billing Address */}
                <Row className="mt-4">
                  <Col xs={12}>
                    <h5>Billing Address</h5>
                  </Col>
                  <Col xs={12} md={6}>
                    <CustomInput
                      label="Address 1"
                      {...register("address")}
                      error={errors.address}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <CustomInput
                      label="City/Suburb"
                      {...register("city")}
                      error={errors.city}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <CustomInput
                      label="State"
                      {...register("state")}
                      error={errors.state}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <CustomInput
                      label="Postcode"
                      {...register("postcode")}
                      error={errors.postcode}
                    />
                  </Col>
                </Row>

                {/* Save Button */}
                <Row className="mt-4">
                  <Col xs={12}>
                    <Button variant="primary" type="submit" className="w-100">
                      Save your profile
                    </Button>
                  </Col>
                  <Col xs={12} className="mt-3">
                    <PrimaryButton
                      variant="red"
                      icon={LogoutIcon}
                      text="Sign Out"
                      onClick={handleSignOut}
                    />
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Container>
      ) : (
        <div
          className="no-items-found"
          style={{ textAlign: "center", marginTop: "20px" }}
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
