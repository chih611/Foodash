import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  QuantityInputContainer,
  QuantityButton,
  QuantityInputField as StyledInputField, // Renamed to avoid conflict
} from "./QuantityInputStyles"; // Import styles

const QuantityInputField = ({ quantity, onIncrease, onDecrease, min = 1 }) => {
  return (
    <QuantityInputContainer>
      <QuantityButton onClick={onDecrease}>
        <RemoveIcon />
      </QuantityButton>
      <StyledInputField type="text" value={quantity} readOnly />
      <QuantityButton onClick={onIncrease}>
        <AddIcon />
      </QuantityButton>
    </QuantityInputContainer>
  );
};

export default QuantityInputField;
