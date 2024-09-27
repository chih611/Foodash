import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  } = useForm({
    resolver: yupResolver(schema), // Integrate Yup with react-hook-form
  });

  const router = useRouter(); // Initialize useRouter

  const onSubmit = (data) => {
    console.log(data);
    // Handle sign-in logic here
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center">
      <div className="row w-100">
        {/* Left Side: Form Content */}
        <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center p-5 vh-100 bg-light">
          {/* Company Logo */}
          <img
            src="/Foodash_logo.png" // Correct path to your logo in the public folder
            alt="Company Logo"
            className="img-fluid mb-4"
            style={{ maxWidth: "200px" }} // Adjust logo size as needed
          />

          {/* Sign In Card */}
          <div
            className="card p-4 w-100 shadow-lg"
            style={{ maxWidth: "400px" }}
          >
            <h1 className="text-center mb-4">Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  {...register("password")}
                  type="password"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>

              {/* Sign In Button */}
              <button type="submit" className="btn btn-primary w-100">
                Sign In
              </button>

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
        </div>

        {/* Right Side: Image or Custom Content */}
        <div className="col-12 col-md-6 d-none d-md-flex align-items-center justify-content-center bg-primary vh-100">
          {/* Custom content or image */}
          <div className="text-center text-white p-4">
            <h2>Content (Pictures) go here</h2>
            <img
              src="/path/to/your-image.png"
              alt="Custom Design"
              className="img-fluid"
              style={{ maxWidth: "80%" }}
            />
            <p className="mt-4">Choose later</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
