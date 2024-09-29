// PrimaryButton.jsx
import React from "react";
import {
  PrimaryButtonContainer,
  InvertedButtonContainer,
  RedButtonContainer,
  IconContainer,
} from "./PrimaryButtonStyle"; // Import styled components

const PrimaryButton = ({ onClick, text, icon: Icon, variant = "primary" }) => {
  let ButtonComponent;
  switch (variant) {
    case "inverted":
      ButtonComponent = InvertedButtonContainer;
      break;
    case "red":
      ButtonComponent = RedButtonContainer;
      break;
    case "primary":
    default:
      ButtonComponent = PrimaryButtonContainer;
      break;
  }

  return (
    <ButtonComponent onClick={onClick}>
      {Icon && (
        <IconContainer>
          <Icon
            style={{
              color:
                variant === "inverted"
                  ? "#007bff"
                  : variant === "red"
                  ? "#ef4565"
                  : "#0056b3",
            }}
          />
        </IconContainer>
      )}
      {text}
    </ButtonComponent>
  );
};

export default PrimaryButton;
