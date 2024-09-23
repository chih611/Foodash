// PrimaryButton.js
import React from "react";
import {
  PrimaryButtonContainer,
  InvertedButtonContainer,
  IconContainer,
} from "./PrimaryButtonStyle"; // Import styled components

// Define the PrimaryButton component
const PrimaryButton = ({ onClick, text, icon: Icon, inverted = false }) => {
  // Decide which button style to use based on the `inverted` prop
  const ButtonComponent = inverted
    ? InvertedButtonContainer
    : PrimaryButtonContainer;

  return (
    <ButtonComponent onClick={onClick}>
      <IconContainer>
        <Icon style={{ color: inverted ? "#007bff" : "#0056b3" }} />{" "}
        {/* Icon color changes based on the style */}
      </IconContainer>
      {text}
    </ButtonComponent>
  );
};

export default PrimaryButton;
