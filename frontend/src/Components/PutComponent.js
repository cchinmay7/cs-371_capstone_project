// src/components/PutComponent.js
import React, { useState } from 'react';

function PutComponent({ onPut }) {
  const [serialNumber, setSerialNumber] = useState('');
  const [record, setRecord] = useState({
    sepal_length: '',
    sepal_width: '',
    petal_length: '',
    petal_width: '',
    species: ''
  });

  const handleRecordChange = (e) => {
    const { name, value } = e.target;
    setRecord(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert numeric fields to numbers
    const processedRecord = {
      ...record,
      sepal_length: parseFloat(record.sepal_length),
      sepal_width: parseFloat(record.sepal_width),
      petal_length: parseFloat(record.petal_length),
      petal_width: parseFloat(record.petal_width)
    };

    onPut(serialNumber, processedRecord);
  };

  const handleJsonUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        setRecord(jsonData);
      } catch (error) {
        alert('Invalid JSON file');
      }
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="put-component">
      <h2>Update Iris Record</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          placeholder="Enter Serial Number to Update"
          required
        />
        <input
          type="number"
          name="sepal_length"
          value={record.sepal_length}
          onChange={handleRecordChange}
          placeholder="Sepal Length"
          step="0.1"
          required
        />
        <input
          type="number"
          name="sepal_width"
          value={record.sepal_width}
          onChange={handleRecordChange}
          placeholder="Sepal Width"
          step="0.1"
          required
        />
        <input
          type="number"
          name="petal_length"
          value={record.petal_length}
          onChange={handleRecordChange}
          placeholder="Petal Length"
          step="0.1"
          required
        />
        <input
          type="number"
          name="petal_width"
          value={record.petal_width}
          onChange={handleRecordChange}
          placeholder="Petal Width"
          step="0.1"
          required
        />
        <select
          name="species"
          value={record.species}
          onChange={handleRecordChange}
          required
        >
          <option value="">Select Species</option>
          <option value="Iris-setosa">Iris-setosa</option>
          <option value="Iris-versicolor">Iris-versicolor</option>
          <option value="Iris-virginica">Iris-virginica</option>
        </select>
        <button type="submit">Update Record</button>
      </form>
      
      <div className="json-upload">
        <h3>Or Upload JSON File</h3>
        <input 
          type="file" 
          accept=".json"
          onChange={handleJsonUpload}
        />
      </div>
    </div>
  );
}

export default PutComponent;
