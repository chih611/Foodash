import {
  Badge,
  Breadcrumb,
  Button,
  Col,
  Figure,
  Image,
  Navbar,
  Row,
  Form,
  Nav,
} from "react-bootstrap";
// Icons
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";

const Header = ({ breadcrumb, handleSelect }) => {
  return (
    <>
      <Row className="align-items-center admin-header">
        <Col lg={2}>
          <Navbar.Brand href="#home">
            {" "}
            <Image src="Foodash_logo.png" className="w-100" />
          </Navbar.Brand>
        </Col>
        <Col lg={4}>
          <Nav className="flex-row" onSelect={handleSelect}>
            <Nav.Item className="me-2">
              <Nav.Link eventKey="Home">Home </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                {breadcrumb === "Home" ? "" : " > " + breadcrumb}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col lg={4}>
          <Row className="justify-content-end info-group">
            <Col lg={1}>
              <Navbar>
                <Navbar.Collapse>
                  <button className="position-relative btn-info">
                    <NotificationsNoneIcon />
                    <Badge className="position-absolute" pill>
                      9
                    </Badge>
                  </button>
                </Navbar.Collapse>
              </Navbar>
            </Col>
            <Col lg={1}>
              <Navbar>
                <Navbar.Collapse className="justify-content-end">
                  <button className="position-relative btn-info">
                    <ChatIcon />
                    <Badge className="position-absolute" pill>
                      9
                    </Badge>
                  </button>
                </Navbar.Collapse>
              </Navbar>
            </Col>
            <Col lg={1}>
              <Navbar>
                <Navbar.Collapse className="justify-content-end">
                  <button className="position-relative btn-info btn-setting">
                    <SettingsIcon />
                    <Badge className="position-absolute" pill>
                      9
                    </Badge>
                  </button>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
        </Col>
        <Col lg={2}>
          <Navbar className="justify-content-center user">
            <Button variant="link">hello, admin</Button>
            <Figure className="figure">
              <Figure.Image
                width={40}
                height={40}
                alt="avatar"
                src="/avatar.png"
              />
            </Figure>
          </Navbar>
        </Col>
      </Row>
    </>
  );
};

export default Header;