// src/components/DeleteComponent.js
import React, { useState } from 'react';

function DeleteComponent({ onDelete }) {
  const [serialNumber, setSerialNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onDelete(serialNumber);
  };

  return (
    <div className="delete-component">
      <h2>Delete Iris Record</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          placeholder="Enter Serial Number"
          required
        />
        <button type="submit">Delete Record</button>
      </form>
    </div>
  );
}

export default DeleteComponent;