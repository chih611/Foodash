import { useState, useEffect } from "react";
import {
  fetchSaleReport,
  fetchSaleSumByMonth,
} from "../../../../store/actions/reportAction";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../_components/table";
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

  // const [show, setShow] = useState(false);
  // const [selectedId, setSelectedId] = useState(null);

  if (saleReports) {
    saleReports.map((item) => {
      headersSaleReports?.push(Object.keys(item));
    });
  }

  // create table view, using map and prop item later from database
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
    {
      key: "2",
      category: "Eat",
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
    {
      key: "3",
      category: "Coffee",
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
    {
      key: "14",
      category: "Food",
      item: "Mini Croissant",
      sold: "120",
      date: "02/01/2024",
      sales: "154.23",
      tax: "15.4",
      refund: "2.67",
      discount: "0",
      netsales: "164.23",
      status: "Active",
    },
    {
      key: "5",
      category: "Others",
      item: "Mini Croissant",
      sold: "120",
      date: "02/01/2024",
      sales: "154.23",
      tax: "15.4",
      refund: "2.67",
      discount: "0",
      netsales: "174.23",
      status: "Active",
    },
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

  // set up date range picker
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [resetRows, setResetRows] = useState(rows);

  // Function to handle date range filtering
  const filteredRows = rows.filter((row) => {
    const rowDate = new Date(row.date);
    const start = new Date(startDate);
    const end = new Date(endDate);

    // If both startDate and endDate are set, filter by range
    if (startDate && endDate) {
      return rowDate >= start && rowDate <= end;
    }
    // If only startDate is set, filter from startDate onwards
    if (startDate) {
      return rowDate >= start;
    }
    // If only endDate is set, filter up to endDate
    if (endDate) {
      return rowDate <= end;
    }
    // If no date filter is set, return all rows
    return true;
  });

  // Function to handle reset (clear)
  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setResetRows(rows); // Reset the table to show all rows
  };

  //Function: calculate total number of sold items
  const countSoldItems = () => {
    return rows.reduce((total, row) => total + parseInt(row.sold, 10), 0);
  };

  // Function to filter by categoty
  // const filterByCategory = rows.filter(row => {
  //   const rowCategory = new String(row.category);

  // });

  return (
    <>
      <div className=" d-flex m-3 p-3">
        {/* Report Sales Item */}
        <div
          className="col-md-3"
          style={{ border: "10px solid #EBF5FD", borderRadius: "30px" }}
        >
          <p className="subtitle_admin m-3"> Report Summary </p>
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
          {/* Filter Funtions: by Date and display total number of item sold */}
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
            </div>
            <h5>Total Number of Item Sold: {countSoldItems()}</h5>
          </div>

          {/* Table content: inc sale data regarding to report format */}
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
