import { useState, useEffect } from "react";
import {
  fetchSaleReport,
  fetchSaleSumByMonth,
} from "../../../../store/actions/reportAction";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../_components/table";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import jsPDF autoTable plugin
import moment from "moment";

const ReportCategory = (props) => {
  const dispatch = useDispatch();
  const currentMonth = moment().month() + 1;

  useEffect(() => {
    dispatch(fetchSaleReport());
    dispatch(fetchSaleSumByMonth(currentMonth));
  }, []);

  const saleReports = useSelector((state) => state.report.saleReports);
  const status = useSelector((state) => state.report.status);
  const saleSumByMonthList = useSelector(
    (state) => state.report.saleSumByMonth
  );
  let headersSaleReports = [];
  const datetimeFields = ["Due Date"];

  if (saleReports) {
    saleReports.map((item) => {
      headersSaleReports?.push(Object.keys(item));
    });
  }

  // Create a function to generate PDF for the report summary
  const generatePDF = () => {
    const doc = new jsPDF(); // Create a new jsPDF instance
    doc.setFontSize(18);
    doc.text("Sales Report Summary", 10, 10); // Title of the PDF
    doc.setFontSize(12);
    doc.text(`Date: ${moment().format("YYYY-MM-DD")}`, 10, 20); // Using moment for date format

    // Adding Sale Summary to PDF
    const saleSummaryData = saleSumByMonthList.map((item) => {
      return Object.entries(item).map(([key, value]) => [key, value]);
    });

    const flattenedData = saleSummaryData.flat();

    // Add autoTable for Sale Summary
    doc.autoTable({
      head: [["Category", "Value"]],
      body: flattenedData, // Adding the sale summary data
      startY: 30, // Start the table below the text
      styles: { fontSize: 10, cellPadding: 3 }, // Table styles
    });

    doc.save("Sales_Report_Summary.pdf"); // Save the PDF
  };

  // Function to generate "Sales by Category" PDF
  const generateSalesByCategoryPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Sales by Category Report", 10, 10);
    doc.setFontSize(12);
    doc.text(`Date: ${moment().format("YYYY-MM-DD")}`, 10, 20);

    // Aggregate data for "Sales by Category"
    const aggregatedData = {};
    saleReports?.forEach((row) => {
      const category = row.Category || "Unknown Category";
      const product = row.Product || "Unknown Product";
      const key = `${category}-${product}`;

      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          category: category,
          item: product,
          sold: 0,
          sales: 0,
          tax: 0,
          netSales: 0,
        };
      }

      aggregatedData[key].sold += parseInt(row.Sold, 10) || 0;
      aggregatedData[key].sales += parseFloat(row.Sales) || 0;
      aggregatedData[key].tax += parseFloat(row.Tax) || 0;
      aggregatedData[key].netSales += parseFloat(row["Net Sales"]) || 0;
    });

    // Prepare data for the PDF
    const summaryTableData = Object.values(aggregatedData).map((item) => [
      item.category,
      item.item,
      item.sold,
      `$${item.sales.toFixed(2)}`,
      `$${item.tax.toFixed(2)}`,
      `$${item.netSales.toFixed(2)}`,
    ]);

    // Add the aggregated summary table to PDF using autoTable
    doc.autoTable({
      head: [
        [
          "Category",
          "Product",
          "Amount Sold",
          "Sales ($)",
          "Tax ($)",
          "Net Sales ($)",
        ],
      ],
      body: summaryTableData,
      startY: 50,
      styles: { fontSize: 10, cellPadding: 3 },
    });

    doc.save("Sales_By_Category_Report.pdf");
  };

  const rows = [
    {
      key: "1",
      category: "Drink",
      item: "Mini Croissant",
      sold: "120",
      date: "02/01/2024",
      sales: "154.23",
      tax: "15.4",
      refund: "0",
      discount: "0",
      netsales: "174.23",
      status: "Active",
    },
    // Additional rows...
  ];

  const columns = [
    { key: "category", label: "Category" },
    { key: "item", label: "Item" },
    { key: "sold", label: "Sold" },
    { key: "date", label: "Date" },
    { key: "sales", label: "Sales" },
    { key: "tax", label: "Tax" },
    { key: "discount", label: "Discount" },
    { key: "refund", label: "Refund" },
    { key: "netsales", label: "NetSales" },
  ];

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [resetRows, setResetRows] = useState(rows);

  const filteredRows = rows.filter((row) => {
    const rowDate = new Date(row.date);
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (startDate && endDate) {
      return rowDate >= start && rowDate <= end;
    }
    if (startDate) {
      return rowDate >= start;
    }
    if (endDate) {
      return rowDate <= end;
    }
    return true;
  });

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setResetRows(rows);
  };

  const countSoldItems = () => {
    return rows.reduce((total, row) => total + parseInt(row.sold, 10), 0);
  };

  return (
    <>
      <div className=" d-flex m-3 p-3">
        <div
          className="col-md-3"
          style={{ border: "10px solid #EBF5FD", borderRadius: "30px" }}
        >
          <Row>
            <Col xs={6}>
              <p className="subtitle_admin m-3"> Report Summary </p>
            </Col>
            <Col xs={6}>
              <button className="btn btn-success mt-3" onClick={generatePDF}>
                Download Summary Report
              </button>
            </Col>
          </Row>

          {saleSumByMonthList?.map((item, index) =>
            Object.entries(item).map(([key, value], j) => (
              <div className="m-3 d-flex justify-content-between" key={index}>
                <p className="subtitle">{key}</p>
                <p className="subtitle ">{value}</p>
              </div>
            ))
          )}
        </div>
        <div className="col-md-9">
          <div
            className="m-2 p-2 d-flex justify-content-between"
            style={{
              backgroundColor: "#EBF5FD",
              minHeight: "auto",
              border: "20px solid #EBF5FD",
              borderRadius: "30px",
            }}
          >
            <p className="subtitle_admin"> SALES BY CATEGORY </p>
            <div>
              <input
                type="date"
                className="form-date-input-blue-color"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="subtitle mx-3">to</span>
              <input
                type="date"
                className="form-date-input-blue-color"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <button
                className="btn btn-secondary mx-3 mb-1"
                onClick={handleReset}
              >
                Clear
              </button>
              <button
                className="btn btn-primary mx-3 mb-1"
                onClick={generateSalesByCategoryPDF}
              >
                Download Sales by Category PDF
              </button>
            </div>
            <h5>Total Number of Item Sold: {countSoldItems()}</h5>
          </div>

          <div
            className="m-2 p-1 flex flex-col gap-3"
            style={{
              border: "20px solid #EBF5FD",
              borderRadius: "40px",
            }}
          >
            <CustomTable
              headers={headersSaleReports}
              records={saleReports ? saleReports : []}
              handleRecordDoubleClick={(e) => handleRecordDoubleClick(e)}
              datetimeFields={datetimeFields}
              statusFetching={status}
              showPagination={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportCategory;
