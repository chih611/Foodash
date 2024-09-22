import {
  Badge,
  Breadcrumb,
  Button,
  Col,
  Figure,
  Image,
  Navbar,
  Row,
  Nav,
} from "react-bootstrap";
// Icons
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Header = ({ breadcrumb, handleSelect }) => {
  return (
    <>
      <Row className="align-items-center admin-header">
        <Col>
          <Navbar.Brand href="#home">
            {" "}
            <Image src="Foodash_logo.png" className="w-50" />
          </Navbar.Brand>
        </Col>
        <Col>
          <Nav className="flex-row breadcrumb" onSelect={handleSelect}>
            <Nav.Item className="me-2">
              <Nav.Link eventKey="Home">Home </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                {breadcrumb === "Home" ? (
                  ""
                ) : (
                  <>
                    <ChevronRightIcon />
                    <span className="underline">{breadcrumb}</span>
                  </>
                )}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col>
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
        <Col>
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