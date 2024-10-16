// PrimaryButtonStyle.js
import styled from "styled-components";

// Main Primary Button Container
const PrimaryButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff; // Blue background
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 10px; // Rounded corners
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); // Subtle shadow

  &:hover {
    background-color: #0056b3; // Darker blue on hover
  }

  &:focus {
    outline: none;
  }
`;

// Inverted style for the button
const InvertedButtonContainer = styled(PrimaryButtonContainer)`
  background-color: #fff; // White background
  color: #007bff; // Blue text
  border: 2px solid #007bff; // Blue border

  &:hover {
    background-color: #e6f2ff; // Light blue on hover
    color: #0056b3;
  }
`;

const RedButtonContainer = styled(PrimaryButtonContainer)`
  background-color: #fff; // White background
  color: #ef4565; // Blue text
  border: 2px solid #ef4565; // Blue border

  &:hover {
    background-color: #ef4565; // Light blue on hover
    color: #fff;
  }
`;

// Icon container
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e6f2ff; // Light blue background for the icon
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
