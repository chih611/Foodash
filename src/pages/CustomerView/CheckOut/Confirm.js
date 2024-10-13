import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import NavBarCheckOut from "./_NavBarCheckOut";
import { useSelector, useDispatch } from "react-redux";
import { ConfirmLayout } from "./CheckOutStyle";
import { getOrderById } from "../../../../store/actions/orderAction";
import { useRouter } from "next/router";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Function to format the date to DD/MM/YYYY
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Confirm = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleToggle = () => setShowOffcanvas(!showOffcanvas);
  const contentRef = useRef(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const { orderId } = router.query; // Retrieve orderId from the URL query

  const order = useSelector((state) => state.order.orderById);

  useEffect(() => {
    if (orderId) {
      // Dispatch action to get the order details by orderId
      dispatch(getOrderById(orderId));
    }
  }, [orderId, dispatch]);

  // Get the first element of the order array
  const orderData = order && order.length > 0 ? order[0] : {};

  console.log(orderData);

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
          <h1 className="my-5">
            Your Order ID: #{orderData?.ID} is confirmed!
          </h1>
          <p className="subtitle my-5">
            Congratulations, your order has been processed. We will prepare and
            deliver to you shortly. Thank you for your patience.
          </p>
        </div>

        <div className="text-center my-4">
          <p className="subtitle my-1">
            Order Date: {formatDate(orderData["Create Date"])}
          </p>
          <p className="subtitle my-1">
            Delivery Date: {formatDate(orderData?.Duedate)}
          </p>
        </div>

        <div
          className="d-flex justify-content-center mx-5 p-5"
          style={{ borderBottom: "solid 1px #ecbf9c" }}
        >
          <div className="mx-2">
            <h4 className="my-2"> Deliver To: </h4>
            <ConfirmLayout>
              <p className="subtitle my-1">{orderData?.Recipient}</p>
              <p className="subtitle my-1">{orderData?.Address}</p>
              <p className="subtitle my-1">{orderData?.Phone}</p>
              <p className="subtitle my-1">{orderData?.Email}</p>
            </ConfirmLayout>
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
    </div>
  );
};

export default Confirm;
