import React, { forwardRef } from "react";
import { Input } from "@nextui-org/input";

const CustomInput = () => {
  forwardRef(
    ({ label, value, onChange, type = "text", error, ...props }, ref) => {
      return (
        <div style={{ marginBottom: "20px" }}>
          <Input
            ref={ref}
            type={type}
            label={label}
            value={value}
            onChange={onChange}
            style={{
              border: "2px solid #90B4CE",
              borderColor: "#90B4CE",
              borderRadius: "10px",
              ...props.style,
            }}
            {...props}
            isInvalid={!!error}
          />
          {error && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {error.message}
            </span>
          )}
        </div>
      );
    }
  );
};

export default CustomInput;
