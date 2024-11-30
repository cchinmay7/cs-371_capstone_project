// src/App.js
import React, { useState } from 'react';
import DeleteComponent from './Components/DeleteComponent';
import PostComponent from './Components/PostComponent';
import PutComponent from './Components/PutComponent';
import GetComponent from './Components/GetComponent';
import ResponseTable from './Components/ResponseTable';

const API_BASE_URL = 'http://ec2-18-117-144-103.us-east-2.compute.amazonaws.com:8000/api/iris';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleApiCall = async (method, endpoint, body = null) => {
    try {
      setError(null);
      setSuccessMessage(null);

      const config = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body) {
        config.body = JSON.stringify(body);
      }

      const response = await fetch(endpoint, config);

      if (!response.ok) {
        throw new Error('API call failed');
      }

      const data = await response.json();

      // Generate success message based on method
      switch (method) {
        case 'POST':
          setSuccessMessage({
            type: 'added',
            record: data
          });
          break;
        case 'PUT':
          setSuccessMessage({
            type: 'updated',
            record: data
          });
          break;
        case 'DELETE':
          setSuccessMessage({
            type: 'deleted',
            record: data
          });
          break;
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'delete':
        return (
          <DeleteComponent
            onDelete={(serialNumber) =>
              handleApiCall('DELETE', `${API_BASE_URL}/${serialNumber}`)
            }
          />
        );
      case 'post':
        return (
          <PostComponent
            onPost={(record) => handleApiCall('POST', API_BASE_URL, record)}
          />
        );
      case 'put':
        return (
          <PutComponent
            onPut={(serialNumber, record) =>
              handleApiCall('PUT', `${API_BASE_URL}/${serialNumber}`, record)
            }
          />
        );
      case 'get':
        return (
          <GetComponent
            onGet={() => handleApiCall('GET', API_BASE_URL)}
          />
        );
      default:
        return null;
    }
  };

  const renderSuccessMessage = () => {
    if (!successMessage) return null;

    const { type, record } = successMessage;
    
    return (
      <div className="success-message">
        <h3>Successfully {type} Record:</h3>
        <ResponseTable data={record} />
      </div>
    );
  };

  return (
    <div className="app-container">
      <h1>Iris Dataset CRUD Operations</h1>

      <div className="navigation">
        <button onClick={() => setActiveComponent('get')}>GET</button>
        <button onClick={() => setActiveComponent('post')}>POST</button>
        <button onClick={() => setActiveComponent('put')}>PUT</button>
        <button onClick={() => setActiveComponent('delete')}>DELETE</button>
      </div>

      {renderContent()}

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}

      {renderSuccessMessage()}
    </div>
  );
}

export default App;
