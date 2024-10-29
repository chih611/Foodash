import { Col, Container, Row, Tab } from "react-bootstrap";
import { useState } from "react";
import Header from "./header";
import SideBar from "./sidebar";

const AdminLayout = () => {
  const [breadcrumb, setbreadcrumb] = useState("Home");

  const handleSelect = (eventKey) => {
    setbreadcrumb(eventKey);
  };

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="Home">
      <Container fluid className="admin_container">
        <Header breadcrumb={breadcrumb} handleSelect={handleSelect} />
        <SideBar handleSelect={handleSelect} setbreadcrumb={setbreadcrumb} />
      </Container>
    </Tab.Container>
  );
};

export default AdminLayout;
