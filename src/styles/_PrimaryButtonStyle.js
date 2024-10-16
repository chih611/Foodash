// PrimaryButtonStyle.js
import styled from "styled-components";

// Main Primary Button Container
const PrimaryButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f38b3c; // Orange background
  color: #fff; // White text
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); // Subtle shadow

  &:hover {
    background-color: #e07a2d; // Darker orange on hover
  }

  &:focus {
    outline: none;
  }
`;

// Inverted style for the button
const InvertedButtonContainer = styled(PrimaryButtonContainer)`
  background-color: #fff; // White background
  color: #f38b3c; // Orange text
  border: 2px solid #f38b3c; // Orange border

  &:hover {
    background-color: #fce8d8; // Light orange on hover
    color: #e07a2d; // Darker orange text on hover
  }
`;

const RedButtonContainer = styled(PrimaryButtonContainer)`
  background-color: #fff; // White background
  color: #ef4565; // Blue text
  border: 2px solid #ef4565; // Blue border

  &:hover {
    background-color: #ef4565; // Red background on hover
    color: #fff; // White text on hover
  }
`;

// Icon container
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px; // Rounded corners for the icon container
  width: 30px;
  height: 30px;
  margin-right: 10px; // Space between the icon and the text
`;

export default {
  PrimaryButtonContainer,
  InvertedButtonContainer,
  RedButtonContainer,
  IconContainer,
};
