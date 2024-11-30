// src/Components/ResponseTable.js
import React from 'react';

function ResponseTable({ data }) {
  // Handle single object (for POST, PUT, DELETE)
  if (!Array.isArray(data)) {
    return (
      <table className="response-table">
        <thead>
          <tr>
            {Object.keys(data).map(key => (
              <th key={key}>{key.replace(/_/g, ' ').toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.values(data).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  }

  // Handle array of objects (for GET)
  if (data.length === 0) return <p>No data available</p>;

  const headers = Object.keys(data[0]);

  return (
    <table className="response-table">
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header}>{header.replace(/_/g, ' ').toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map(header => (
              <td key={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResponseTable;
