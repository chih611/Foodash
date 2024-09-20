import {
    Badge,
    Breadcrumb,
    Button,
    Col,
    Figure,
    Image,
    Navbar,
    Row,
} from "react-bootstrap";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';

const Header = ({ breadcrumb }) => {

    return (
        <>
            <Row>
                <Col lg={ 3 }>
                    <Navbar.Brand href="#home"> <Image src="Foodash_logo.png" className="w-50" /></Navbar.Brand>
                </Col>
                <Col lg={ 4 }>
                    <Navbar>
                        <Navbar.Collapse>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    { breadcrumb }
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
                <Col lg={ 2 }>
                    <Row>
                        <Col lg={ 4 }>
                            <Navbar>
                                <Navbar.Collapse>
                                    <Button variant="info" size='sm' className="position-relative">
                                        <NotificationsNoneIcon />
                                        <Badge bg="secondary" className="position-absolute top-0 end-0" pill>9</Badge>
                                    </Button>
                                </Navbar.Collapse>
                            </Navbar>
                        </Col>
                        <Col lg={ 4 }>
                            <Navbar>
                                <Navbar.Collapse className="justify-content-end">
                                    <Button variant="info" size='sm' className="position-relative">
                                        <ChatIcon />
                                        <Badge bg="secondary" className="position-absolute top-0 end-0" pill>9</Badge>
                                    </Button>
                                </Navbar.Collapse>
                            </Navbar>
                        </Col>
                        <Col lg={ 4 }>
                            <Navbar>
                                <Navbar.Collapse className="justify-content-end">
                                    <Button variant="info" size='sm' className="position-relative">
                                        <SettingsIcon />
                                        <Badge bg="secondary" className="position-absolute top-0 end-0" pill>9</Badge>
                                    </Button>
                                </Navbar.Collapse>
                            </Navbar>
                        </Col>
                    </Row>
                </Col>
                
              
                <Col lg={ 2 } >
                     <Navbar className="justify-content-end">
                        <Button variant="link" >hello, admin</Button>
                    </Navbar>
                </Col>
                <Col lg={ 1}>
                    <Navbar className="justify-content-start">
                        <Figure>
                            <Figure.Image
                                width={ 30 }
                                height={ 30 }
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