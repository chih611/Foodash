import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const AddPayment = ({ pickup, fees, setPromoValue }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const cartTotal = cartItems
    .filter((item) => item !== null) // Ensure null items are filtered out
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [total, setTotal] = useState(cartTotal);
  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  useEffect(() => {
    // Ensure all fee prices are numbers before summing
    const feesTotal = fees.reduce(
      (sum, fee) => sum + (pickup && fee.id === 1 ? 0 : Number(fee.price)),
      0
    );
    const discountAmount = appliedPromo ? appliedPromo.discountAmount : 0;

    // Set promo value to be used in the order payload
    setPromoValue(discountAmount); // This will pass the promo value to the parent (Checkout component)

    const newTotal = Math.max(
      0,
      parseFloat(cartTotal) + feesTotal - discountAmount
    );
    setTotal(newTotal);
  }, [fees, appliedPromo, cartTotal, pickup, setPromoValue]);

  const handlePromoApply = () => {
    // Mock promo code validation
    const validPromoCodes = {
      SAVE10: { discountAmount: 10, description: "$10 off" },
      HALF50: { discountAmount: 50, description: "50% off up to $50" },
    };

    if (validPromoCodes[promo]) {
      setAppliedPromo({
        code: promo,
        ...validPromoCodes[promo],
      });
      setPromo(""); // Clear input
    } else {
      alert("Invalid promo code");
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoValue(0); // Reset promo value when promo is removed
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

      <div className="w-100 d-flex justify-content-between">
        <p className="subtitle mt-3 mb-1">Subtotal</p>
        <p className="subtitle mt-3 mb-1">${cartTotal.toFixed(2)} </p>
      </div>

      {/* List of costs */}
      {fees.map((fee) => (
        <div key={fee.id} className="w-100 d-flex justify-content-between">
          <p className="subtitle mt-3 mb-1">{fee.name}</p>
          <p className="subtitle mt-3 mb-1">
            ${pickup && fee.id === 1 ? "0.00" : fee.price.toFixed(2)}
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
        <p className="h4 mt-3 mb-1">${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default AddPayment;
