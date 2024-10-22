// PrimaryButton.jsx
import React from "react";
import styles from "../../../styles/_PrimaryButtonStyle"; // Import styled components

const PrimaryButton = ({ onClick, text, icon: Icon, variant = "primary" }) => {
  let ButtonComponent;
  switch (variant) {
    case "inverted":
      ButtonComponent = styles.InvertedButtonContainer;
      break;
    case "red":
      ButtonComponent = styles.RedButtonContainer;
      break;
    case "primary":
    default:
      ButtonComponent = styles.PrimaryButtonContainer;
      break;
  }

  return (
    <ButtonComponent onClick={onClick}>
      {Icon && (
        <styles.IconContainer>
          <Icon
            style={{
              color:
                variant === "inverted"
                  ? "#007bff"
                  : variant === "red"
                  ? "#ef4565"
                  : "#ecbf9c",
            }}
          />
        </styles.IconContainer>
      )}
      {text}
    </ButtonComponent>
  );
};

export default PrimaryButton;
