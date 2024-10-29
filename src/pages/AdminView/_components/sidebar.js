import { Button, Col, Nav, Row } from "react-bootstrap";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import styles from "../../../styles/styles";
import Contents from "./contents";

const SideBar = ({ handleSelect }) => {
  return (
    <>
      <Row className="admin-main m-2">
        <Col lg={2} className="my-2">
          <Row className="flex-column justify-content-between side-bar">
            <Col>
              <Nav
                variant="pills"
                className="flex-column"
                onSelect={handleSelect}
              >
                <Nav.Item>
                  <Nav.Link className={styles.nav_style} eventKey="Home">
                    <HomeIcon className={styles.icon_style} />
                    Home Page <ChevronRightIcon />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className={styles.nav_style} eventKey="Order">
                    <ReceiptLongIcon className={styles.icon_style} />
                    order <ChevronRightIcon />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className={styles.nav_style} eventKey="Product">
                    <FastfoodIcon />
                    product <ChevronRightIcon />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className={styles.nav_style} eventKey="Profile">
                    <AccountBoxIcon />
                    profile <ChevronRightIcon />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className={styles.nav_style}
                    eventKey="User setting"
                  >
                    <PeopleAltIcon />
                    user setting <ChevronRightIcon />
                  </Nav.Link>
                </Nav.Item>
                <div className="my-3"></div>
                <Button className={styles.nav_style + "admin_bg_btn"}>
                  LOG OUT
                </Button>
              </Nav>
            </Col>
            {/* <Col className={styles.logout_btn}>
              <Button>LOG OUT</Button>
            </Col> */}
          </Row>
        </Col>
        <Col lg={10}>
          <Contents />
        </Col>
      </Row>
    </>
  );
};

export default SideBar;
