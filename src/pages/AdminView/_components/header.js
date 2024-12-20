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
  // use the local storage for getting unread item
  const [unreadCount, setUnreadCount] = useState(() => Number(localStorage.getItem("unreadCount")) || 0); 

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

  // Update unread count and local storage whenever notifications change
  useEffect(() => {
    if (notifications) {
      const newUnreadCount = notifications.length;
      if (newUnreadCount !== unreadCount) {  // Only update if the count has changed
        setUnreadCount(newUnreadCount);
        localStorage.setItem("unreadCount", newUnreadCount);
      }
    }
  }, [notifications]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setUnreadCount(0);
      localStorage.setItem("unreadCount", "0"); // Reset unread count in local storage
    }
  };

  return (
    <>
      <Row className="align-items-center admin-header">
        <Col xs="3">
          <Navbar.Brand href="#home">
            {" "}
            <Image src="/Foodash_logo.png" className="w-50" />
          </Navbar.Brand>
        </Col>
        <Col xs="5">
          <Nav className="flex-row breadcrumb" onSelect={handleSelect}>
            <Nav.Item className="me-2">
              <Nav.Link eventKey="Home" className="admin_txt_link">
                Home{" "}
              </Nav.Link>
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
        <Col xs="2">
          <Row className="justify-content-end info-group">
            <Col lg={1}>
              <Button
                className={`position-relative admin_bg_btn ${
                  showNotifications ? "active" : ""
                }`}
                onClick={toggleNotifications}
              >
                <NotificationsNoneIcon />
                <Badge
                  className="position-absolute"
                  pill
                  bg="danger"
                  text="light"
                >
                  {/* {isLoading ? '...' : (notifications && notifications.length) || 0} */}
                  {isLoading ? "..." : unreadCount}
                </Badge>
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs="2">
          <Navbar className="justify-content-center user">
            <Button variant="link text-capitalize fw-bold text-pressed-color">
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
        <NotificationBoard
          notifications={notifications || []}
          onClose={toggleNotifications}
          data={notifications}
        />
      )}
    </>
  );
};

export default Header;