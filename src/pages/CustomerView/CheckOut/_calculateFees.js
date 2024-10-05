import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import ArrowRightRounded from "@mui/icons-material/ArrowRightRounded";
import CreditCardRounded from "@mui/icons-material/CreditCardRounded";
import DetailForm from "./_recipientForm";

const AddPayment = ({ pickup }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const cartTotal = cartItems
    .filter((item) => item !== null) // Ensure null items are filtered out
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  const [total, setTotal] = useState(cartTotal);
  console.log("cartTotal", cartTotal);

  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [fees, setFees] = useState([
    { id: 1, name: "Subtotal", price: parseFloat(cartTotal) },
    { id: 2, name: "Delivery Fee", price: 6.99 },
    { id: 2, name: "Service Fee", price: 2.99 },
    { id: 4, name: "Utensil", price: 1.99 },
    { id: 5, name: "Gift Wrap", price: 5.5 },
  ]);

  useEffect(() => {
    // Calculate total whenever fees, appliedPromo, or cartTotal change
    const feesTotal = fees.reduce(
      (sum, fee) => sum + (pickup && fee.id === 1 ? 0 : fee.price),
      0
    );
    const discountAmount = appliedPromo ? appliedPromo.discountAmount : 0;
    const newTotal = Math.max(
      0,
      parseFloat(cartTotal) + feesTotal - discountAmount
    );
    setTotal(newTotal.toFixed(2));
  }, [fees, appliedPromo, cartTotal, pickup]);

  const handlePromoApply = () => {
    // This is a mock promo code validation
    // In a real application, you'd typically check this against a backend
    const validPromoCodes = {
      SAVE10: { discountAmount: 10, description: "$10 off" },
      HALF50: { discountAmount: 50, description: "50% off up to $50" },
    };

    if (validPromoCodes[promo]) {
      setAppliedPromo({
        code: promo,
        ...validPromoCodes[promo],
      });
      setPromo(""); // Clear the input field
    } else {
      alert("Invalid promo code");
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const handleUpdateFees = (updatedFees) => {
    setFees(updatedFees);
  };

  return (
    <div>
      <p className="subtitle mt-3 mb-1">Promo Code</p>
      <div className="w-100 d-flex">
        <input
          placeholder="Enter your code here"
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          className="form_item1 me-3"
        />
        <Button
          variant="primary mt-3"
          style={{ height: "40px" }}
          onClick={handlePromoApply}
        >
          Apply
        </Button>
      </div>

      {appliedPromo && (
        <div className="w-100 d-flex justify-content-between align-items-center mt-2">
          <p className="subtitle mb-0">
            Applied Promo: {appliedPromo.code} ({appliedPromo.description})
          </p>
          <Button variant="outline-danger" size="sm" onClick={removePromo}>
            Remove
          </Button>
        </div>
      )}

      {/* List of costs */}
      {fees.map((fee) => (
        <div key={fee.id} className="w-100 d-flex justify-content-between">
          <p className="subtitle mt-3 mb-1">{fee.name}</p>
          <p className="subtitle mt-3 mb-1">
            ${pickup && fee.id == 1 ? "0.0" : fee.price.toFixed(2)}
          </p>
        </div>
      ))}

      {/* Discount line */}
      {appliedPromo && (
        <div className="w-100 d-flex justify-content-between">
          <p className="subtitle mt-3 mb-1">Discount</p>
          <p className="subtitle mt-3 mb-1 text-success">
            -${appliedPromo.discountAmount.toFixed(2)}
          </p>
        </div>
      )}

      {/* Summary of the total */}
      <div className="w-100 d-flex justify-content-between">
        <p className="h4 mt-3 mb-1">Total</p>
        <p className="h4 mt-3 mb-1">${total}</p>
      </div>
    </div>
  );
};

export default AddPayment;
