import React from "react";
import Link from "next/link";

const Foodash = () => {
  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Link href="/CustomerView/LandingPage/LandingPage"></Link>
          </li>
          <li>
            <Link href="/CustomerView/CustomerProfile/CustomerProfile"></Link>
          </li>
          <li>
            <Link href="/CustomerView/Menu/Menu"></Link>
          </li>
          <li>
            <Link href="/CustomerView/OrderTracking/OrderTracking"></Link>
          </li>
          <li>
            <Link href="/CustomerView/BoughtBefore/BoughtBefore"></Link>
          </li>
          <li>
            <Link href="CustomerView/HomePage/HomePage"></Link>
          </li>
          <li>
            <Link href="CustomerView/ItemDetails/ItemDetails"></Link>
          </li>
          <li>
            <Link href="/CustomerView/Special/Special"></Link>
          </li>
          <li>
            <Link href="/CustomerView/ViewCart/ViewCart"></Link>
          </li>
          <li>
            <Link href="/CustomerView/CheckOut/CheckOut"></Link>
          </li>
          <li>
            <Link href="/CustomerView/SignIn/SignIn"></Link>
          </li>
          <li>
            <Link href="/AdminView/Dashboard/Dashboard"></Link>
          </li>
          <li>
            <Link href="/AdminView/CRM/CRM"></Link>
          </li>
          <li>
            <Link href="/AdminView/Inventory/Inventory"></Link>
          </li>
          <li>
            <Link href="/AdminView/OrderManagement/OrderManagement"></Link>
          </li>
          <li>
            <Link href="/AdminView/Products/Products"></Link>
          </li>
          <li>
            <Link href="/AdminView/UserSetting/UserSetting"></Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Foodash;
