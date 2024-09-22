// QuantityInputStyle.js
import styled from "styled-components";

// Styled container for the quantity input section
export const QuantityInputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #094067;
  border-radius: 4px;
  padding: 2px 5px;
  max-width: 100px;
`;

// Styled button for increase and decrease actions
export const QuantityButton = styled.button`
  background-color: #fff;
  border: 2px solid #094067;
  color: #094067;
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
    background-color: #007bff;
    color: #fff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Styled input field to display the quantity
export const QuantityInputField = styled.input`
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
