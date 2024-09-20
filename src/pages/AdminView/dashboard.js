import {
  Tab,
} from "react-bootstrap";
import { useState } from "react";

import Header from "./_Components/header";
import SideBar from "./_Components/sidebar";

const Dashboard = () => {
  const [ breadcrumb, setBreadcrumb ] = useState(false);

  const handleSelect = (eventKey) => {
    setBreadcrumb(eventKey);
  };

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Header breadcrumb={ breadcrumb } />
      <SideBar
        handleSelect={ handleSelect }
        setBreadcrumb={ setBreadcrumb } />
    </Tab.Container>
  );
};

export default Dashboard;
