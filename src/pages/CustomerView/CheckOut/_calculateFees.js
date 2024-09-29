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
import ArrowRightRounded from "@mui/icons-material/ArrowRightRounded";
import CreditCardRounded from "@mui/icons-material/CreditCardRounded";
import DetailForm from "./_recipientForm"


const AddPayment = () => {
    const [promo, setPromo] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [fees, setFees] = useState([
        { id: 1, name: "Delivery Fee", price: 6.99 },
        { id: 2, name: "Service Fee", price: 2.99 },
        { id: 3, name: "Utensil", price: 1.99 },
        { id: 4, name: "Gift Wrap", price: 5.50 },
    ]);
    const [total, setTotal] = useState(0);
    

    useEffect(() => {
        // Calculate total whenever fees or appliedPromo change
        const feesTotal = fees.reduce((sum, fee) => sum + fee.price, 0);
        const discountAmount = appliedPromo ? appliedPromo.discountAmount : 0;
        const newTotal = Math.max(0, feesTotal - discountAmount);
        setTotal(newTotal);
    }, [fees, appliedPromo]);

    const handlePromoApply = () => {
        // This is a mock promo code validation
        // In a real application, you'd typically check this against a backend
        const validPromoCodes = {
            'SAVE10': { discountAmount: 10, description: '$10 off' },
            'HALF50': { discountAmount: 50, description: '50% off up to $50' }
        };

        if (validPromoCodes[promo]) {
            setAppliedPromo({
                code: promo,
                ...validPromoCodes[promo]
            });
            setPromo(''); // Clear the input field
        } else {
            alert('Invalid promo code');
        }
    };

    const removePromo = () => {
        setAppliedPromo(null);
    };

    const handleUpdateFees = (updatedFees) => {
        setFees(updatedFees);
      };

    return(
        <div>
            <p className="subtitle mt-3 mb-1">Promo Code</p>
            <div className="w-100 d-flex">
                <input
                    placeholder="Enter your code here"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    className="form_item1 me-3"
                />
                <Button variant="primary mt-3" style={{height: "40px"}} onClick={handlePromoApply}>
                    Apply
                </Button>
            </div>

            {appliedPromo && (
                <div className="w-100 d-flex justify-content-between align-items-center mt-2">
                    <p className="subtitle mb-0">Applied Promo: {appliedPromo.code} ({appliedPromo.description})</p>
                    <Button variant="outline-danger" size="sm" onClick={removePromo}>Remove</Button>
                </div>
            )}

            {/* List of costs */}
            {fees.map((fee) => (
                <div key={fee.id} className="w-100 d-flex justify-content-between">
                    <p className="subtitle mt-3 mb-1">{fee.name}</p>
                    <p className="subtitle mt-3 mb-1">${fee.price.toFixed(2)}</p>
                </div>
            ))}

            {/* Discount line */}
            {appliedPromo && (
                <div className="w-100 d-flex justify-content-between">
                    <p className="subtitle mt-3 mb-1">Discount</p>
                    <p className="subtitle mt-3 mb-1 text-success">-${appliedPromo.discountAmount.toFixed(2)}</p>
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