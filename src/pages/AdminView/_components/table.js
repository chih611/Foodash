import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Dropdown } from 'react-bootstrap'; // Import Dropdown from react-bootstrap if needed
import EditIcon from '@mui/icons-material/Edit'; // Import Edit Icon from MUI
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete Icon from MUI


function TableContent({ headers, data, onEdit, onDelete, onSort }) {
  return (
    <table className="table table-striped table-borderless table-hover">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className={header === 'STATUS' || header === 'Actions' ? 'text-center' : ''}
            >
              {header} {/* Display the header as plain text */}
            </th>
          ))}
          <th className="text-center">Actions</th> {/* Center align action header */}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={colIndex} className={header === 'STATUS' ? 'status-cell text-center' : ''}>
                {header === 'PHONE_NUMBER' ? (
                  <a
                    href={`tel:${row[header]}`}
                    className="phone-link"
                    style={{ color: '#007bff', textDecoration: 'underline' }} // Custom styles for the phone number
                  >
                    {row[header]}
                  </a>
                ) : header === 'NAME' ? (
                  <span style={{ color: '#094067', fontWeight: 'bold' }}> {/* Custom color for name content */}
                    {row[header]}
                  </span>
                ) : header === 'STATUS' ? (
                  <span className={`badge ${row[header] === 'COMPLETED' ? 'badge-success' : 'badge-danger'}`}>
                    {row[header]}
                  </span>
                ) : (
                  row[header]
                )}
              </td>
            ))}
            <td className="text-center"> {/* Center align action buttons */}
              <button
                className="btn btn-sm me-2"
                onClick={() => onEdit(row)}
                style={{ color: '#094067', backgroundColor: 'transparent', border: 'none' }} // Custom color for edit button, no background
              >
                <EditIcon /> {/* Edit Icon */}
              </button>
              <button
                className="btn btn-sm"
                onClick={() => onDelete(row)}
                style={{ color: '#A30D11', backgroundColor: 'transparent', border: 'none' }} // Custom color for delete button, no background
              >
                <DeleteIcon /> {/* Delete Icon */}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TableContent.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of headers (strings)
  data: PropTypes.arrayOf(PropTypes.object).isRequired, // Array of data objects
  onEdit: PropTypes.func, // Function for edit action
  onDelete: PropTypes.func, // Function for delete action
  onSort: PropTypes.func.isRequired // Function for sorting action
};

TableContent.defaultProps = {
  onEdit: () => {},
  onDelete: () => {}
};

export default TableContent;
