import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    console.log(data);
    // Handle account creation logic here, e.g., send data to backend API
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

          {/* Sign Up Card */}
          <div className="card p-4 w-100 shadow-lg" style={{ maxWidth: '500px' }}>
            <h1 className="text-center mb-4">Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                {/* First Name */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName" className="form-label">First Name:</label>
                  <input
                    id="firstName"
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    {...register("firstName", { required: "First Name is required" })}
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName.message}</div>
                  )}
                </div>

                {/* Last Name */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name:</label>
                  <input
                    id="lastName"
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    {...register("lastName", { required: "Last Name is required" })}
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName.message}</div>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  id="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Email"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  id="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                  type="password"
                  placeholder="Password"
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password.message}</div>
                )}
              </div>

              <div className="row">
                {/* Date of Birth */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="dob" className="form-label">Date of Birth:</label>
                  <input
                    id="dob"
                    type="date"
                    className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                    {...register("dob", { required: "Date of Birth is required" })}
                  />
                  {errors.dob && <div className="invalid-feedback">{errors.dob.message}</div>}
                </div>

                {/* Gender */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="gender" className="form-label">Gender:</label>
                  <select
                    id="gender"
                    className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                    {...register("gender", { required: "Gender is required" })}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <div className="invalid-feedback">{errors.gender.message}</div>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                <input
                  id="phoneNumber"
                  type="tel"
                  className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid phone number, must be 10 digits",
                    },
                  })}
                  placeholder="Phone Number"
                />
                {errors.phoneNumber && (
                  <div className="invalid-feedback">{errors.phoneNumber.message}</div>
                )}
              </div>

              <div className="row">
                {/* Company Name */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="companyName" className="form-label">Company Name (Optional):</label>
                  <input
                    id="companyName"
                    className="form-control"
                    {...register("companyName")}
                    placeholder="Company Name"
                  />
                </div>

                {/* ABN */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="abn" className="form-label">ABN (Optional):</label>
                  <input
                    id="abn"
                    className="form-control"
                    {...register("abn")}
                    placeholder="ABN"
                  />
                </div>
              </div>

              {/* Create Account Button */}
              <button type="submit" className="btn btn-success w-100">
                Create Account
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Image or Custom Content */}
        <div className="col-12 col-md-6 d-none d-md-flex align-items-center justify-content-center bg-primary vh-100">
          {/* Custom content or image */}
          <div className="text-center text-white p-4">
            <h2>Welcome to Our Community</h2>
            <img 
              src="/path/to/your-image.png" 
              alt="Custom Design" 
              className="img-fluid"
              style={{ maxWidth: '80%' }}
            />
            <p className="mt-4">
              Join us and be a part of our amazing journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
