import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { Col, Row } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInCustomer } from "../../../../store/slices/customerSlice";
import PrimaryButton from "../ViewCart/_PrimaryButton";
import { signInAsAdmin } from "../../../../store/slices/adminSlice"; // Import the admin sign-in action
import ChatBot from "../ChatBot/ChatBot";

// Define the validation schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues, // Destructure getValues from useForm
  } = useForm({
    resolver: yupResolver(schema), // Integrate Yup with react-hook-form
  });

  const router = useRouter(); // Initialize useRouter
  const dispatch = useDispatch(); // Initialize useDispatch
  const { status, error } = useSelector((state) => state.customer); // Access Redux state

  const onSubmit = async (data) => {
    // Dispatch signInCustomer thunk
    try {
      const resultAction = await dispatch(signInCustomer(data));

      // Check if sign-in was successful
      if (signInCustomer.fulfilled.match(resultAction)) {
        console.log("Sign-in successful:", resultAction.payload);
        router.push("/CustomerView/HomePage");
      } else {
        console.error("Sign-in failed:", resultAction.payload);
      }
    } catch (err) {
      console.error("Sign-in error:", err);
    }
  };

  const handleAdminSignIn = async () => {
    // Dispatch signInAsAdmin thunk
    try {
      const resultAction = await dispatch(
        signInAsAdmin({
          email: getValues("email"), // Use getValues to access the form data
          password: getValues("password"),
        })
      );

      // Check if admin sign-in was successful
      if (signInAsAdmin.fulfilled.match(resultAction)) {
        console.log("Admin sign-in successful:", resultAction.payload);
        router.push("/AdminView"); // Redirect to admin dashboard
      } else {
        console.error("Admin sign-in failed:", resultAction.payload);
      }
    } catch (err) {
      console.error("Admin sign-in error:", err);
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: "url('/SignIn.jpg')", // Set the background image for the entire screen
        backgroundSize: "cover", // Make the background cover the whole screen
        backgroundPosition: "center", // Center the background image
        backgroundRepeat: "no-repeat", // Prevent repetition of the image
      }}
    >
      {/* Sign In Card */}
      <div
        className="card p-4 w-100 shadow-lg"
        style={{
          maxWidth: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
        }} // Added opacity to make the form stand out over the background
      >
        <img
          src="/Foodash_logo.png" // Correct path to your logo in the public folder
          alt="Company Logo"
          className="img-fluid mb-4"
          style={{ maxWidth: "200px", display: "block", margin: "0 auto" }} // Center the logo
        />
        <h1 className="text-center mb-4">Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Display error message if sign-in fails */}
          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email")}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password")}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          {/* Sign In Button */}
          <Row>
            <Col xs={6}>
              <PrimaryButton
                type="submit"
                variant="primary"
                className="btn btn-primary w-100"
                disabled={status === "loading"} // Disable button while loading
                text={
                  status === "loading"
                    ? "Signing In As  Customer..."
                    : "Sign In As Customer"
                }
              />
            </Col>
            <Col xs={6}>
              <PrimaryButton
                variant="inverted"
                className="btn btn-warning w-100 mt-3"
                onClick={handleAdminSignIn}
                disabled={status === "loading"}
                text={
                  status === "loading"
                    ? "Signing In As Admin..."
                    : "Sign In As Admin"
                }
              />
            </Col>
          </Row>

          {/* Admin Sign In Button */}

          {/* Register Button */}
          <button
            type="button"
            className="btn btn-secondary w-100 mt-3"
            onClick={() => router.push("/CustomerView/Register")} // Corrected absolute path
          >
            Register
          </button>
        </form>
      </div>
      <ChatBot />
    </div>
  );
};

export default SignIn;
