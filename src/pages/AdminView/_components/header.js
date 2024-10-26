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
import { useEffect, useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { fetchNotifications } from "../../../../store/actions/notificationAction";
import NotificationBoard from "./notificationBoard";

const Header = ({ breadcrumb, handleSelect }) => {
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = useSelector(state => state.notifications.notifications);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchNotifications());
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    loadNotifications();
  }, [dispatch]);

  const toggleNotifications = () => {
    console.log('Notification button clicked!'); // Add this line
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      <Row className="align-items-center admin-header my-3">
        <Col>
          <Navbar.Brand href="#home">
            {" "}
            <Image src="/Foodash_logo.png" className="w-50" />
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
                  <Button className={`position-relative btn-info ${showNotifications ? 'active' : ''}`}
                          onClick={toggleNotifications}>
                    <NotificationsNoneIcon />
                    <Badge className="position-absolute" pill>
                      {/* 9 */}
                      {isLoading ? '...' : (notifications && notifications.length) || 0}
                    </Badge>
                  </Button>
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
            <Button variant="link text-capitalize fw-bold">
              Hello, I'm Admin
            </Button>
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
      {/* {showNotifications && <NotificationBoard notifications={notifications || []} onClose={toggleNotifications} />} */}
      {showNotifications && (
  <NotificationBoard notifications={notifications || []} onClose={toggleNotifications} data = {notifications} />
)}
    </>
  );
};

export default Header;