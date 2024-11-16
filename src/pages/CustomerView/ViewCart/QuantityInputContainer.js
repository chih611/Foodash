import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "../../../styles/_QuantityInputStyles"; // Import styles

const QuantityInputField = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <styles.QuantityInputContainer>
      <styles.QuantityButton type="button" onClick={onDecrease}>
        <RemoveIcon />
      </styles.QuantityButton>
      <styles.QuantityInputField type="text" value={quantity} readOnly />
      <styles.QuantityButton type="button" onClick={onIncrease}>
        <AddIcon />
      </styles.QuantityButton>
    </styles.QuantityInputContainer>
  );
};

export default QuantityInputField;
