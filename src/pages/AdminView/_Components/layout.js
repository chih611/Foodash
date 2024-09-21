import { Tab } from 'react-bootstrap'
import { useState } from 'react'
import Header from './header'
import SideBar from './sidebar'

const AdminLayout = () => {
    const [breadcrumb, setbreadcrumb] = useState(false);

    const handleSelect = (eventKey) => {
      setbreadcrumb(eventKey);
    };

    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Header breadcrumb={breadcrumb} handleSelect={handleSelect} />
        <SideBar handleSelect={handleSelect} setbreadcrumb={setbreadcrumb} />
      </Tab.Container>
    );
}

export default AdminLayout
