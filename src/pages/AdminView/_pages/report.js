import { Card, Col, Container, Row, Tab, Dropdown, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

import SwapVertRounded from "@mui/icons-material/SwapVertRounded";


const Report = (props) => {
  useEffect(() => {}, []);

  const categories = [
    {id: '111', name: 'EAT', total: '11000', sold: '123', stock: '1200', expired: '108' },
    {id: '112', name: 'FOOD', total: '12000', sold: '123', stock: '2010', expired: '180' },
    {id: '113', name: 'COFFEE', total: '11000', sold: '123', stock: '2003', expired: '188' },
    {id: '114', name: 'DRINK', total: '10100', sold: '123', stock: '9200', expired: '18' },
  ];

  const items = [
    {id: '1111', image: '/', name: 'Mini Mize', sale: '1100'},
    {id: '1101', image: '/', name: 'Buffet', sale: '1200'},
    {id: '1112', image: '/', name: 'Signature Cake', sale: '1100'},
    {id: '1211', image: '/', name: 'Salad Trays', sale: '1010'},
  ];

  const orders = [
    {id: '147', status: 'new', order_date: '08.10.2024'},
    {id: '148', status: 'new', order_date: '08.10.2024'},
    {id: '149', status: 'new', order_date: '09.10.2024'},
    {id: '150', status: 'new', order_date: '10.10.2024'}
  ] 
  // sorted by date


  // set up date range picker
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // useEffect(() => {
  //   const now = new Date();
  //   const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  //   const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  //   setStartDate(formatDate(firstDayOfMonth));
  //   setEndDate(formatDate(lastDayOfMonth));
  // }, []);

  // const formatDate = (date) => {
  //   return date.toISOString().split('T')[0];
  // };

  // to display recent month for catergory report
  const getMonthName = (date) => {
    return new Date().toLocaleString('default', { month: 'long' });
  };  
  // useEffect(() => {
  //   // If using Bootstrap 5, you might need to initialize dropdowns
  //   if (typeof bootstrap !== 'undefined') {
  //     var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
  //     var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
  //       return new bootstrap.Dropdown(dropdownToggleEl)
  //     })
  //   }
  // }, []); 
  // No need in react bootstrap cux it can handle by itself
  

  return (
    <>
      <Tab.Pane
        {...props}
        className="g-4 bg-2nd-color mt-1 px-3 py-3 rounded-4"
      >
        <Row className="m-3 justify-content-around">
          <Col lg={7}>
            <Card className="rounded-4 mb-4">
              <Card.Body>
                <Card.Title className="subtitle_admin mb-3">
                  Sales By Category
                </Card.Title>
                <Button variant="primary">View Report</Button>
                <label className="font-medium text-gray-700 ms-4">
                  This month: {getMonthName(startDate)}
                </label>

                <div
                  className="d-flex my-2 justify-content-around"
                  style={{ borderBottom: "solid 1px #90B4CE" }}
                >
                  <div className="my-3">
                    <p className="mb-3 subtitle_admin d-flex">
                      Product
                      <button>
                        {" "}
                        <SwapVertRounded />{" "}
                      </button>
                    </p>
                    {categories.map((cate) => (
                      <p className="subtitle text-center" key={cate.id}>
                        {cate.name}
                      </p>
                    ))}
                  </div>
                  <div className="my-3">
                    <p className="mb-3 subtitle_admin">
                      Total
                      <button>
                        {" "}
                        <SwapVertRounded />{" "}
                      </button>
                    </p>
                    {categories.map((cate) => (
                      <p className="subtitle" key={cate.id}>
                        {cate.total}
                      </p>
                    ))}
                  </div>
                  <div className="my-3">
                    <p className="mb-3 subtitle_admin">
                      Sold
                      <button>
                        {" "}
                        <SwapVertRounded />{" "}
                      </button>
                    </p>
                    {categories.map((cate) => (
                      <p className="subtitle" key={cate.id}>
                        {cate.sold}
                      </p>
                    ))}
                  </div>
                  <div className="my-3">
                    <p className="mb-3 subtitle_admin">
                      Stock
                      <button>
                        {" "}
                        <SwapVertRounded />{" "}
                      </button>
                    </p>
                    {categories.map((cate) => (
                      <p className="subtitle" key={cate.id}>
                        {cate.stock}
                      </p>
                    ))}
                  </div>
                  <div className="my-3 ">
                    <p className="mb-3 subtitle_admin">
                      Left
                      <button>
                        {" "}
                        <SwapVertRounded />{" "}
                      </button>
                    </p>
                    {categories.map((cate) => (
                      <p className="subtitle" key={cate.id}>
                        {cate.expired}
                      </p>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={5}>
            <Card className="rounded-4">
              <Card.Body>
                <Card.Title className="subtitle_admin">
                  Sales By Item
                </Card.Title>
                <Dropdown className="my-3">
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    This month
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">This Week</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">This Quater</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">This Year</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Card.Text className="my-3">
                  {/* {items.map(item => (
                      <div className="my-3 d-flex justify-content-between" key={item.id}> 
                          <p className="subtitle mx-4" >{item.image}</p>
                          <p className="subtitle mx-4" >{item.name}</p>
                          <p className="subtitle mx-4" key={item.id}>{item.sale}</p>
                      </div>  
                    ))} */}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row xs={1} md={2} className="m-3 justify-content-around">
          <Col lg={4}>
            <Card className="rounded-4">
              <Card.Body>
                <Card.Title className="subtitle_admin">Processing</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8}>
            <Card className="rounded-4">
              <Card.Body>
                <Card.Title className="subtitle_admin">
                  Order Management
                </Card.Title>
                {/* <div className="date-range-picker-container w-100">
                    <input type = "date" 
                          // value = {startDate} 
                          
                    />
                    <span className="subttitle mx-3">to</span>
                    <input type = "date" 
                          // value = {endDate} 
                          
                    />
                  </div> */}
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Pane>
    </>
  );
};

export default Report;
