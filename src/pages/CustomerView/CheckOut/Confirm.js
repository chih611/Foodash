import React, { useState, useRef } from "react";
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
import Image from "next/image";
import NavBarCheckOut from "./_NavBarCheckOut";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import { useSelector } from "react-redux";
import { ConfirmLayout } from "./CheckOutStyle";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Confirm = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleToggle = () => setShowOffcanvas(!showOffcanvas);
  const contentRef = useRef(null);
  const order = useSelector((state) => state.order.orderById);
  console.log(order);

  const generatePDF = async () => {
    const content = contentRef.current;
    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;
    pdf.addImage(
      imgData,
      "PNG",
      imgX,
      imgY,
      imgWidth * ratio,
      imgHeight * ratio
    );
    pdf.save("order_confirmation.pdf");
  };

  const [infos] = useState([
    { id: 1, type: "name", data: "Daha Mohamad" },
    { id: 2, type: "phone", data: "+61 2347 146 792" },
    { id: 3, type: "email", data: "abc124@gmail.com" },
    {
      id: 4,
      type: "address",
      data: "Unit 5, 104 Lord St., Bundoora, Vic, 3083",
    },
  ]);

  const [orders] = useState([
    { id: 1, type: "orderdate", data: "20/12/2024" },
    { id: 2, type: "deliverytime", data: "Mon 30/12/2024" },
    { id: 3, type: "orderid", data: "#125678910" },
  ]);

  const [items] = useState([
    {
      id: 1,
      qty: 2,
      desc: "Box(16) - Spiced Potato Samosa (vegan)",
      unitPrice: 50.0,
      total: 250.0,
    },
    {
      id: 2,
      qty: 2,
      desc: "Box(16) - Seasonal Green and Ricotta Rolls",
      unitPrice: 50.0,
      total: 250.0,
    },
    {
      id: 3,
      qty: 2,
      desc: "Box(12) - Carrot Cake",
      unitPrice: 50.0,
      total: 250.0,
    },
    { id: 4, qty: 80, desc: "Mixed Drinks", unitPrice: 5.0, total: 400.0 },
  ]);

  return (
    <div>
      <NavBarCheckOut />
      <div ref={contentRef}>
        <div className="container-fluid d-flex justify-content-center my-4">
          <img
            src="/Confirm_icon.png"
            alt="Logo"
            width={100}
            height={100}
            className="navbar-brand"
          />
        </div>

        <div className="text-center my-4">
          <h1 className="my-5">Your OrderID: #125678910 is made!</h1>
          <p className="subtitle my-5">
            Congratulations, your order has been processed. We will prepare and
            deliver to you shortly. Thank you for your patience.
          </p>
        </div>

        <div className="text-center my-4">
          {orders.map((order) => (
            <p key={order.id} className="subtitle my-1">
              {" "}
              {order.type}: {order.data}{" "}
            </p>
          ))}
        </div>

        <div
          className="d-flex justify-content-center mx-5 p-5"
          style={{ borderBottom: "solid 1px #ecbf9c" }}
        >
          <div className="mx-2">
            <h4 className="my-2"> Deliver To: </h4>
            <ConfirmLayout>
              {infos.map((info) => (
                <div
                  key={info.id}
                  className="w-100 d-flex justify-content-between"
                >
                  <p className="subtitle my-1"> {info.data} </p>
                </div>
              ))}
            </ConfirmLayout>
          </div>
          <div className="mx-2">
            <h4 className="my-2"> Billing Details: </h4>
            <ConfirmLayout>
              {infos.map((info) => (
                <div key={info.id} className="d-flex justify-content-between">
                  <p className="subtitle my-1"> {info.data} </p>
                </div>
              ))}
            </ConfirmLayout>
          </div>
        </div>

        <div className="d-flex justify-content-around mx-5 my-5">
          <div>
            <h4 className="mb-3"> QTY </h4>
            {items.map((item) => (
              <p key={item.id} className="subtitle">
                {item.qty}{" "}
              </p>
            ))}
          </div>
          <div>
            <h4 className="mb-3"> PRODUCT </h4>
            {items.map((item) => (
              <p key={item.id} className="subtitle">
                {item.desc}{" "}
              </p>
            ))}
          </div>
          <div>
            <h4 className="mb-3"> UNIT PRICE</h4>
            {items.map((item) => (
              <p key={item.id} className="subtitle">
                {item.unitPrice.toFixed(2)}{" "}
              </p>
            ))}
          </div>
          <div>
            <h4 className="mb-3"> TOTAL </h4>
            {items.map((item) => (
              <p key={item.id} className="subtitle">
                {item.total.toFixed(2)}{" "}
              </p>
            ))}
          </div>
        </div>

        <div
          className="text-end mx-5 p-5"
          style={{ borderTop: "solid 1px #ecbf9c" }}
        >
          <h4 className="my-2">Total Cost</h4>
          <p className="subtitle">(including gst and fees)</p>
          <h5 className="my-2">
            ${items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
          </h5>
        </div>

        <div
          className="text-end mx-5 p-5"
          style={{ borderTop: "solid 1px #ecbf9c" }}
        >
          <p>insert logo in this footer</p>
        </div>
      </div>

      <div className="text-center m-5">
        <button className="button-2" onClick={generatePDF}>
          Generate PDF Invoice
        </button>
      </div>

      <div className="m-5">
        <Link href="/CustomerView/OrderTracking" passHref>
          <Button className="button-2 w-100">Track your order here</Button>
        </Link>
      </div>
    </div>
  );
};

export default Confirm;
