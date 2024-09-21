import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import EditIcon from '@mui/icons-material/Edit'; // Import Edit Icon from MUI
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete Icon from MUI


function TableContent({ headers, data, onEdit, onDelete }) {
  return (
    <table className="table table-striped table-borderless table-hover">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className={header === 'STATUS' || header === 'Actions' ? 'text-center' : ''}
            >
              {header}
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
                {header === 'STATUS' ? (
                  <span className={`badge ${row[header] === 'COMPLETED' ? 'badge-success' : 'badge-danger'}`}>
                    {row[header]}
                  </span>
                ) : (
                  row[header]
                )}
              </td>
            ))}
            <td className="text-center"> {/* Center align action buttons */}
              <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(row)}>
                <EditIcon /> {/* Edit Icon */}
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(row)}>
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
  onDelete: PropTypes.func // Function for delete action
};

TableContent.defaultProps = {
  onEdit: () => {},
  onDelete: () => {}
};

export default TableContent;
