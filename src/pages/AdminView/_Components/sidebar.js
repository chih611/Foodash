import {
    Col,
    Nav,
    Row,
    Tab,
} from "react-bootstrap";
import Report from "../report";
import Order from "../order";
import Inventory from "../inventory";
import Product from "../product";
import CRM from "../crm";
import UserSetting from "../user_setting";
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';

import { nav_style,icon_style } from "../styles";

const SideBar = ({
    handleSelect,
    setBreadcrumb }) => {

    return (
        <>
            <Row>
                <Col sm={ 3 }>
                    <Nav variant="pills" className="flex-column" onSelect={ handleSelect }>
                        <Nav.Item>
                            <Nav.Link className={ nav_style } eventKey="Report"><HomeIcon className={ icon_style} />report</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className={ nav_style } eventKey="Order"><AssessmentIcon className={ icon_style} />order</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className={ nav_style } eventKey="Inventory">inventory</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className={ nav_style } eventKey="Product">product</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className={ nav_style } eventKey="CRM">crm</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className={ nav_style } eventKey="User setting">user setting</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={ 9 }>
                    <Tab.Content>
                        <Report eventKey="Report" setBreadcrumb={ setBreadcrumb } />
                        <Order eventKey="Order" setBreadcrumb={ setBreadcrumb } />
                        <Inventory eventKey="Inventory" setBreadcrumb={ setBreadcrumb } />
                        <Product eventKey="Product" />
                        <CRM eventKey="CRM" />
                        <UserSetting eventKey="User setting" />
                    </Tab.Content>
                </Col>
            </Row>
        </>
    );
};

export default SideBar;