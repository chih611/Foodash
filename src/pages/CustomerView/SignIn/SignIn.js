import * as React from "react";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // This function will be called when the form is submitted successfully
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
            placeholder="email"
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: "15px" }}>
          <label>Password:</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            type="password"
            placeholder="password"
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div style={{ marginBottom: "15px" }}>
          <input type="submit" value="Sign In" />
        </div>
        
        {/* Register Button */}
        <button type="button" onClick={() => console.log("Register button clicked")}>
          Register
        </button>
      </form>
    </div>
  );
};

export default SignIn;
