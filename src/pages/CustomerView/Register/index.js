import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCustomer } from "../../../../store/slices/customerSlice";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import {
  selectCustomerStatus,
  selectCustomerError,
} from "../../../../store/selector/selector";
import ChatBot from "../ChatBot/ChatBot";
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  dob: yup
    .date()
    .max(new Date(), "Date of Birth cannot be in the future")
    .required("Date of Birth is required"),
  gender: yup.string().required("Gender is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Invalid phone number, must be 10 digits")
    .required("Phone Number is required"),
  companyName: yup.string(),
  abn: yup.string(),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const status = useSelector(selectCustomerStatus);
  const error = useSelector(selectCustomerError);

  const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

  // You now define onSubmit here within the MailchimpSubscribe render.
  const onSubmit = async (data, subscribe) => {
    const formattedDOB = new Date(data.dob).toISOString().split("T")[0];

    const customerData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      address: data.address || "N/A",
      dob: formattedDOB,
      gender: data.gender,
      type: "user",
    };

    try {
      await dispatch(createCustomer(customerData)).unwrap();
      console.log("Customer Data:", customerData);

      // This will trigger the Mailchimp subscription with form data.
      subscribe({
        EMAIL: data.email,
        FNAME: data.firstName,
        LNAME: data.lastName,
        PHONE: data.phoneNumber,
      });

      router.push("/CustomerView/SignIn");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: "url('/SignIn.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="card p-4 w-100 shadow-lg"
        style={{
          maxWidth: "500px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
        }}
      >
        <img
          src="/Foodash_logo.png"
          alt="Company Logo"
          className="img-fluid mb-4"
          style={{ maxWidth: "200px", display: "block", margin: "0 auto" }}
        />
        <h1 className="text-center mb-4">Sign Up</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <MailchimpSubscribe
          url={MAILCHIMP_URL}
          render={({ subscribe, status, message }) => (
            <>
              {/* The form submission now happens here, with access to subscribe */}
              <form
                onSubmit={handleSubmit((data) => onSubmit(data, subscribe))}
              >
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name:
                    </label>
                    <input
                      id="firstName"
                      className={`form-control ${
                        errors.firstName ? "is-invalid" : ""
                      }`}
                      {...register("firstName")}
                      placeholder="First Name"
                    />
                    {errors.firstName && (
                      <div className="invalid-feedback">
                        {errors.firstName.message}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name:
                    </label>
                    <input
                      id="lastName"
                      className={`form-control ${
                        errors.lastName ? "is-invalid" : ""
                      }`}
                      {...register("lastName")}
                      placeholder="Last Name"
                    />
                    {errors.lastName && (
                      <div className="invalid-feedback">
                        {errors.lastName.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    id="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    {...register("email")}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    id="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="dob" className="form-label">
                      Date of Birth:
                    </label>
                    <input
                      id="dob"
                      type="date"
                      className={`form-control ${
                        errors.dob ? "is-invalid" : ""
                      }`}
                      {...register("dob")}
                    />
                    {errors.dob && (
                      <div className="invalid-feedback">
                        {errors.dob.message}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="gender" className="form-label">
                      Gender:
                    </label>
                    <select
                      id="gender"
                      className={`form-select ${
                        errors.gender ? "is-invalid" : ""
                      }`}
                      {...register("gender")}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <div className="invalid-feedback">
                        {errors.gender.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number:
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    className={`form-control ${
                      errors.phoneNumber ? "is-invalid" : ""
                    }`}
                    {...register("phoneNumber")}
                    placeholder="Phone Number"
                  />
                  {errors.phoneNumber && (
                    <div className="invalid-feedback">
                      {errors.phoneNumber.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="companyName" className="form-label">
                    Company Name (optional):
                  </label>
                  <input
                    id="companyName"
                    className="form-control"
                    {...register("companyName")}
                    placeholder="Company Name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="abn" className="form-label">
                    ABN (optional):
                  </label>
                  <input
                    id="abn"
                    className="form-control"
                    {...register("abn")}
                    placeholder="ABN"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Sign Up
                </button>

                {status === "sending" && <div>Sending...</div>}
                {status === "error" && (
                  <div
                    style={{ color: "red" }}
                    dangerouslySetInnerHTML={{ __html: message }}
                  />
                )}
                {status === "success" && (
                  <div style={{ color: "green" }}>Created!</div>
                )}
              </form>
            </>
          )}
        />
      </div>
      <ChatBot />
    </div>
  );
};

export default Register;
