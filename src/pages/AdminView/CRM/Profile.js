import React from 'react';
import { Table, Button } from 'react-bootstrap';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const CRM = () => {
  return (
  <div>
    <h1 className="crm-title">CRM_Profile</h1>
    <div className="crm-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="crm-title">Customer List</h1>
        <Button variant="primary" className="add-btn">
          Add Customer
        </Button>
      </div>

      <Table striped bordered hover responsive className="customer-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Dietary</th>
            <th>Order History</th>
            <th>Recommend</th>
            <th>Details</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#20462</td>
            <td>
              <AccountCircleIcon className="customer-icon" /> ABC
            </td>
            <td><span className="badge badge-success">Vegetarian</span></td>
            <td>3 Orders</td>
            <td><Button variant="link"><LibraryAddIcon /></Button></td>
            <td><a href="/view/20462">View</a></td>
            <td>
              <Button variant="link"><EditIcon /></Button>
              <Button variant="link" className="text-danger"><DeleteIcon /></Button>
            </td>
          </tr>
          <tr>
            <td>#18933</td>
            <td>
              <AccountCircleIcon className="customer-icon" /> ABC
            </td>
            <td><span className="badge badge-success">Vegetarian</span></td>
            <td>5 Orders</td>
            <td><Button variant="link"><LibraryAddIcon /></Button></td>
            <td><a href="/view/18933">View</a></td>
            <td>
              <Button variant="link"><EditIcon /></Button>
              <Button variant="link" className="text-danger"><DeleteIcon /></Button>
            </td>
          </tr>
          <tr>
            <td>#20462</td>
            <td><AccountCircleIcon className="customer-icon" /> ABC</td>
            <td><span className="badge badge-success">Vegetarian</span></td>
            <td>3 Orders</td>
            <td><Button variant="link"><LibraryAddIcon /></Button></td>
            <td><a href="/view/20462">View</a></td>
            <td>
              <Button variant="link"><EditIcon /></Button>
              <Button variant="link" className="text-danger"><DeleteIcon /></Button>
            </td>
          </tr>
          <tr>
            <td>#18933</td>
            <td><AccountCircleIcon className="customer-icon" /> DEF</td>
            <td><span className="badge badge-warning">Gluten-Free</span></td>
            <td>5 Orders</td>
            <td><Button variant="link"><LibraryAddIcon /></Button></td>
            <td><a href="/view/18933">View</a></td>
            <td>
              <Button variant="link"><EditIcon /></Button>
              <Button variant="link" className="text-danger"><DeleteIcon /></Button>
            </td>
          </tr>
          <tr>
            <td>#45169</td>
            <td><AccountCircleIcon className="customer-icon" /> GHI</td>
            <td><span className="badge badge-danger">None</span></td>
            <td>10 Orders</td>
            <td><Button variant="link"><LibraryAddIcon /></Button></td>
            <td><a href="/view/45169">View</a></td>
            <td>
              <Button variant="link"><EditIcon /></Button>
              <Button variant="link" className="text-danger"><DeleteIcon /></Button>
            </td>
          </tr>
          <tr>
            <td>#34304</td>
            <td><AccountCircleIcon className="customer-icon" /> JKL</td>
            <td><span className="badge badge-info">Vegan</span></td>
            <td>7 Orders</td>
            <td><Button variant="link"><LibraryAddIcon /></Button></td>
            <td><a href="/view/34304">View</a></td>
            <td>
              <Button variant="link"><EditIcon /></Button>
              <Button variant="link" className="text-danger"><DeleteIcon /></Button>
            </td>
          </tr>
          <tr>
            <td>#17188</td>
            <td><AccountCircleIcon className="customer-icon" /> MNO</td>
            <td><span className="badge badge-warning">Gluten-Free</span></td>
            <td>14 Orders</td>
            <td><Button variant="link"><LibraryAddIcon /></Button></td>
            <td><a href="/view/17188">View</a></td>
            <td>
              <Button variant="link"><EditIcon /></Button>
              <Button variant="link" className="text-danger"><DeleteIcon /></Button>
            </td>
          </tr>
          <tr>
            <td>#73003</td>
            <td><AccountCircleIcon className="customer-icon" /> PQR</td>
            <td><span className="badge badge-success">Vegetarian</span></td>
            <td>15 Orders</td>
            <td><Button variant="link"><LibraryAddIcon /></Button></td>
            <td><a href="/view/73003">View</a></td>
            <td>
              <Button variant="link"><EditIcon /></Button>
              <Button variant="link" className="text-danger"><DeleteIcon /></Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  </div>  
  );
};

export default CRM;
