import React, { useState } from 'react';

const GetComponent = ({ onGet }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleGetClick = async () => {
    setIsLoading(true);
    try {
      const result = await onGet();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  const tableStyles = {
    borderCollapse: 'collapse',
    width: '100%',
    border: '2px solid black'
  };

  const cellStyles = {
    border: '2px solid black',
    padding: '8px',
    textAlign: 'center'
  };

  const headerStyles = {
    border: '2px solid black',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f3f4f6'
  };

  const speciesStyles = {
    ...cellStyles,
    textAlign: 'left'
  };

  return (
    <div className="max-w-[95%] mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Iris Dataset Statistics</h2>
      
      <div className="mb-4">
        <button 
          onClick={handleGetClick} 
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Loading...' : 'Fetch Data'}
        </button>
      </div>

      {data.length > 0 && (
        <div className="overflow-x-auto">
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={headerStyles}>Species</th>
                <th style={headerStyles}>Count</th>
                <th style={headerStyles}>Avg Sepal<br/>Length</th>
                <th style={headerStyles}>Avg Sepal<br/>Width</th>
                <th style={headerStyles}>Avg Petal<br/>Length</th>
                <th style={headerStyles}>Avg Petal<br/>Width</th>
                <th style={headerStyles}>Min Sepal<br/>Length</th>
                <th style={headerStyles}>Max Sepal<br/>Length</th>
                <th style={headerStyles}>Min Petal<br/>Length</th>
                <th style={headerStyles}>Max Petal<br/>Length</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.species}>
                  <td style={speciesStyles}>{row.species}</td>
                  <td style={cellStyles}>{row.count}</td>
                  <td style={cellStyles}>{row.avg_sepal_length}</td>
                  <td style={cellStyles}>{row.avg_sepal_width}</td>
                  <td style={cellStyles}>{row.avg_petal_length}</td>
                  <td style={cellStyles}>{row.avg_petal_width}</td>
                  <td style={cellStyles}>{row.min_sepal_length}</td>
                  <td style={cellStyles}>{row.max_sepal_length}</td>
                  <td style={cellStyles}>{row.min_petal_length}</td>
                  <td style={cellStyles}>{row.max_petal_length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetComponent;