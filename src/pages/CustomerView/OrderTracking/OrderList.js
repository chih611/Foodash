import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";

import CircleRounded from "@mui/icons-material/CircleRounded";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";


const OrderList = () => {
    return (
      <div className="filters-section my-3">
        {/* Desktop View */}
        <Row className="w-100 align-items-center d-none d-lg-flex " style={{marginTop: "24px"}}>
          {/* List of orders in this account */}

          {/* 1st column: Date */}
          <Col xs={12} md={3} className="mb-2">
            <Link href={'/'} legacyBehavior passHref>
              <a className="text-decoration-none ">
                <div className="align-items-center w-100">
                  <p className="subtitle w-100 text-center">02/09/24</p>  
                  <p className="subtitle w-100 text-center">02/09/24</p>  
                </div> 
                {/* Link apis to databse in here after for above <p> </p> sector */}
              </a>
            </Link>
          
          </Col>

          {/* 2nd column: OrderID */}
          <Col xs={12} md={3} className="mb-2">
            <Link href={'/'} legacyBehavior passHref>
              <a className="text-decoration-none">
                <div className="align-items-center w-100">
                  <p className="subtitle w-100 text-center">#314AOT61</p>  
                </div> 
                
                <p className="subtitle w-100 text-center">#314AOT61</p>  
                {/* Link apis to databse in here after for above <p> </p> sector */}
              </a>
            </Link>          
          </Col>

          {/* 3rd column: Amount */}
          <Col xs={12} md={3} className="mb-2">
            <Link href={'/'} legacyBehavior passHref>
              <a className="text-decoration-none">
                <div className="align-items-center w-100">
                  <p className="subtitle w-100 text-center">$123.45</p> 
                   
                </div> 
                <p className="subtitle w-100 text-center">$123.45</p> 
                {/* Link apis to databse in here after for above <p> </p> sector */}
              </a>
            </Link>            
          </Col>

          {/* Final column: Status */}
          <Col xs={12} md={3} className="d-flex align-items-center mb-2">
            <Link href={'/'} legacyBehavior passHref>
              <a 
                className="d-flex align-items-center text-decoration-none w-100"
                style={{
                  // backgroundColor: 
                  //   status === 'Preparing' ? '#f0ad4e' :  // yellowish for Preparing
                  //   status === 'Completed' ? '#5cb85c' :  // green for Completed
                  //   status === 'Delivering' ? '#0275d8' : // blue for Delivering
                  //   '#6c757d',                           // grey for other statuses
                  // color: 'white',                         // White text for contrast
                  padding: '10px',                        // Optional padding
                  borderRadius: '5px'                     // Optional rounded edges
                }}
              >
                <div className="align-items-center flex-column text-decoration-none w-100">

                  {/* Icon and text pair 1 */}
                  <div className="d-flex align-items-center mb-2 ms-5">
                    <CircleRounded className="mb-2 me-3" sx = {{color:"#ef4565"}}/>
                    {/* {add color status} */}
                    <p className="subtitle mb-2">
                      {/* {status} */}
                      Delivering
                    </p>
                  </div>
                  
                  {/* Icon and text pair 2 */}
                  <div className="d-flex align-items-center mb-2 ms-5">
                    <CircleRounded className="mb-1 me-3" />
                    <p className="subtitle mb-1">Completed</p>
                  </div>
                </div>
              </a>
            </Link>    
          </Col>

          <div className="w-100 align-items-center d-none d-lg-flex ">
            <Button className="w-100 align-items-center d-none d-lg-flex" style={{backgroundColor: "#ffffff", border: "none", color: "#094067"}}>
              <KeyboardArrowDownRounded className="w-100 align-items-center"/>
            </Button>
            
          </div>

        </Row>

        <Row className="w-100 align-items-center d-none d-lg-flex" style={{marginTop: "24px", borderTop: "1px solid #90B4CE"}}>
          <h4 className= "mt-4 mb-0">Recent Order</h4>

        </Row>


      </div>
    );
  };
  
export default OrderList;