import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
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
          <div className="card p-4 w-100 shadow-lg" style={{ maxWidth: '400px' }}>
            <h1 className="text-center mb-4">Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password.message}</div>
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
                onClick={() => router.push("/CustomerView/Register/Register")} // Corrected absolute path
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
              style={{ maxWidth: '80%' }}
            />
            <p className="mt-4">
              Choose later
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
