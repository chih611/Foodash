import { Card, Col, Container, Row, Tab, Dropdown, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

import Link from "next/link";

import SwapVertRounded from "@mui/icons-material/SwapVertRounded";
import FilterListOutlined from "@mui/icons-material/FilterListOutlined";
// import { ReportCategory } from "./reportCategory";


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
    {id: '147', status: 'new', create_date: '08.10.2024'},
    {id: '148', status: 'new', create_date: '08.10.2024'},
    {id: '149', status: 'new', create_date: '09.10.2024'},
    {id: '150', status: 'new', create_date: '10.10.2024'}
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

  const getMonthName = (date) => {
    return new Date().toLocaleString('default', { month: 'long' });
  };  
  

  return (
    <>
      <Tab.Pane
        {...props}
        className="g-4 bg-2nd-color mt-1 px-3 py-3 rounded-4"
      >
        <Row className="m-3 justify-content-around">
          {/* Report Sale by category */}
          <Col lg={7}>
            <Card className="rounded-4 mb-4">
              <Card.Body>
                <Card.Title className="subtitle_admin mb-3" >Sales By Category</Card.Title>
                <Link href="./AdminView/_pages/reportCategory">
                  <Button variant = 'primary' >
                  
                    View Report
                  </Button> 
                </Link>
                
                <label className="font-medium text-gray-700 ms-4">This month: {getMonthName(startDate)}</label> 
                
                <div className="d-flex my-2 justify-content-around" style={{borderBottom: 'solid 1px #90B4CE'}}>
                    {['Product', 'Total', 'Sold', 'Stock', 'Expired'].map((header, index) => (
                      <div key={index} className="my-3">
                        <p className="mb-3 subtitle_admin">
                          {header}
                          <button> <SwapVertRounded /> </button>
                        </p>
                        {categories.map((cate) => (
                          <p className="subtitle text-center" key={cate.id}>
                            {index === 0 ? cate.name : index === 1 ? cate.total : index === 2 ? cate.sold : index === 3 ? cate.expired : cate.expired}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>    
                
              </Card.Body>
            </Card>
          </Col>

          {/* Report sale by Items */}
          <Col lg={5}>
            <Card className="rounded-4" >
              <Card.Body >
                <Card.Title className="subtitle_admin">Sales By Item</Card.Title>
                <Dropdown className ='my-3'>
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
                  
                    {items.map(item => (
                      <div className="my-3 d-flex justify-content-between" key={item.id} > 
                          <p className="subtitle mx-4" >{item.image}</p>
                          <p className="subtitle mx-4" >{item.name}</p>
                          <p className="subtitle mx-4" key={item.id}>{item.sale}</p>
                      </div>  
                    ))}
                      
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
      </Row>
      <Row xs={1} md={2} className="m-3 justify-content-around">
        {/* Notify the new order or upcoming order */}
          <Col lg={4}>
            <Card className="rounded-4">
              <Card.Body>
                <Card.Title className="subtitle_admin">New Orders</Card.Title>
                <div className="d-flex my-2 justify-content-around" style={{borderBottom: 'solid 1px #90B4CE'}}>
                    {['Order ID', 'Status', 'Created Date'].map((header, index) => (
                      <div key={index} className="my-3">
                        <p className="mb-3 subtitle">
                          {header}
                          <button mb-2> <FilterListOutlined /> </button>
                        </p>
                        {orders.map((order) => (
                          <p className="subtitle text-center" key={order.id}>
                            {index === 0 ? order.id : index === 1 ? order.status : index === 2 ? order.create_date : cate.create_date}
                          </p>
                        ))}
                      </div>
                    ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8}>
            <Card className="rounded-4">
              <Card.Body>
                <Card.Title className="subtitle_admin">Order Management</Card.Title>
                
                {/* <ReportCategory/> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Pane>
    </>
  );
};

export default Report;
