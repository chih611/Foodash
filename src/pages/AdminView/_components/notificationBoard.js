import React, { useEffect } from 'react';
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

const NotificationBoard = ({ notifications, onClose }) => {
  useEffect(() => {
    console.log('NotificationBoard mounted');
    return () => console.log('NotificationBoard unmounted');
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '100px',
      right: '30px',
      width: '500px',
      maxHeight: '600px',
      overflowY: 'auto',
      background: 'white',
      border: '2px solid black',
      borderRadius: '8px',
      padding: '20px',
      zIndex: 1001,
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h2>Notifications ({notifications.length})</h2>
      <Button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>Close</Button>
      {notifications.map((notification, index) => (
        <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
          {notification.DESCRIPTION}
        </div>
      ))}
    </div>
  );
};

export default NotificationBoard;