import { Button, Col, Form, Row } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";

import CustomTable from "../_components/table";
import { fetchOrderDetailList } from "../../../../store/actions/orderDetailAction";
import {
  fetchOrderList,
  fetchOrderListById,
  updateOrderViewById,
} from "../../../../store/actions/orderAction";
import styles from "../../../styles/styles";
import PersonalDetail from "./personal_information";
import OrderInformation from "./order_information";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const OrderDetails = ({
  Id,
  setOpen,
  customTableColor,
  extraReadOnlyFields,
}) => {
  let recordsOrderDetails = [];
  let headersOrderDetails = [];
  const dateTimeFields = ["Duedate", "Create Date"];
  const readOnlyFields = ["Full Name"];
  extraReadOnlyFields && readOnlyFields.push(...extraReadOnlyFields);

  const textBoxFields = [
    "Full Name",
    "Duedate",
    "Recipient",
    "Address",
    "Phone",
    "Email",
    "Deliver",
    "Payment",
    "Taxes",
    "Delivery Fee",
    "Service Fee",
    "UTENSIL",
    "Giftwrap",
    "Promotion",
    "Subtotal",
    "ORDER_ITEM_ID",
    "Total",
    "Create Date",
  ];
  const personalInfo = ["Full Name", "Phone", "Address", "Email"];
  const dropDownFields = ["Status"];
  const objectFields = ["Modification"];

  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState({});
  const [orderChanges, setOrderChanges] = useState({}); // Track only changes
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    dispatch(fetchOrderDetailList(Id));
    dispatch(fetchOrderListById(Id));
  }, [dispatch, Id]);

  const orderDetailList = useSelector(
    (state) => state.orderDetail.orderDetailList,
    shallowEqual
  );
  const order = useSelector((state) => state.order.orderById);
  const statusOrderFetching = useSelector((state) => state.order.status);
  const statusOrderDetailFetching = useSelector(
    (state) => state.orderDetail.status
  );

  if (orderDetailList) {
    orderDetailList?.map((item) => {
      headersOrderDetails.push(Object.keys(item));
    });
    recordsOrderDetails = orderDetailList;
  }

  useEffect(() => {
    if (order && Object.keys(order).length) {
      setOrderData(order);
    }
  }, [order]);

  const handleChange = (field, value) => {
    setShowSaveBtn(true);
    setOrderChanges((prevChanges) => ({
      ...prevChanges,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedOrderData = {
      ...orderData[0],
      ...orderChanges,
    };

    // Remove "Full Name" from the object
    delete updatedOrderData["Full Name"];

    console.log("Order Data to be sent:", updatedOrderData);

    try {
      const orderId = Id;
      await dispatch(
        updateOrderViewById({ orderId, updatedData: updatedOrderData })
      );
      setOpen(false);
      dispatch(fetchOrderList());
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Function to generate PDF from the component's content
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

    // Add Order ID to the PDF
    pdf.setFontSize(18);
    pdf.text(`Order ID: #${Id}`, 10, 10); // Display Order ID at the top

    pdf.addImage(
      imgData,
      "PNG",
      imgX,
      imgY + 20, // Adjust image position to fit below the Order ID
      imgWidth * ratio,
      imgHeight * ratio
    );
    pdf.save(`Order_Details_${Id}.pdf`);
  };

  return (
    <>
      <div ref={contentRef}>
        <Form onSubmit={handleSubmit}>
          {order?.map((e, i) => (
            <div key={i}>
              <PersonalDetail
                e={e}
                textBoxFields={textBoxFields}
                personalInfo={personalInfo}
                dropDownFields={dropDownFields}
                dateTimeFields={dateTimeFields}
                readOnlyFields={readOnlyFields}
                Row={Row}
                statusFetching={statusOrderFetching}
                customHeaderColor={customTableColor}
                handleChange={handleChange} // Pass down handleChange
              />
              <OrderInformation
                e={e}
                textBoxFields={textBoxFields}
                personalInfo={personalInfo}
                dropDownFields={dropDownFields}
                dateTimeFields={dateTimeFields}
                readOnlyFields={readOnlyFields}
                Row={Row}
                statusFetching={statusOrderFetching}
                customOrderInformationColor={customTableColor}
                handleChange={handleChange} // Pass down handleChange
              />
            </div>
          ))}
          {showSaveBtn ? (
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Col className="mb-3 d-flex flex-column">
                <Button
                  type="submit"
                  className={`${styles.btn} mt-3 align-self-end`}
                >
                  Save
                </Button>
              </Col>
            </Form.Group>
          ) : null}
        </Form>
        <CustomTable
          headers={headersOrderDetails}
          records={recordsOrderDetails}
          statusFetching={statusOrderDetailFetching}
          objectFields={objectFields}
          showPagination={true}
          customTableColor={customTableColor}
        />
      </div>

      {/* Button to Generate PDF */}
      <div className="text-center my-3">
        <Button onClick={generatePDF} className="btn btn-primary">
          Download Order Details PDF
        </Button>
      </div>
    </>
  );
};

export default OrderDetails;
