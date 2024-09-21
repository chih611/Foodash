// _Components/table.js
import React from 'react';
import PropTypes from 'prop-types';

function TableContent({ headers, data }) {
  return (
    <table className="table table-striped table-borderless table-hover">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={colIndex}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Define PropTypes for better type-checking and documentation
TableContent.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of headers (strings)
  data: PropTypes.arrayOf(PropTypes.object).isRequired // Array of data objects
};

export default TableContent;
