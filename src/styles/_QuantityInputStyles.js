import styled from "styled-components";

// Styled container for the quantity input section
const QuantityInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 5px 1px;
  margin-top: 20px;
  max-width: 100px;
`;

// Styled button for increase and decrease actions
const QuantityButton = styled.button`
  background-color: #fff;
  border: 2px solid #f38b3c;
  color: #f38b3c;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 2px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #f38b3c;
    color: #fff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Styled input field to display the quantity
const QuantityInputField = styled.input`
  width: 40px;
  text-align: center;
  border: none;
  outline: none;
  padding: 0;
  margin: 0 2px;
  background: none;
  box-shadow: none;
  font-size: 16px;
`;

export default { QuantityInputContainer, QuantityButton, QuantityInputField };
