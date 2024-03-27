import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const WINDOW_SIZE = 10; // Window size for calculating average

const AverageCalculator = () => {
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (apiEndpoint) => {
    try {
      const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzExNTMyODMwLCJpYXQiOjE3MTE1MzI1MzAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjZmNGQyMTQxLTQ0MjctNDM2MS1hOTRiLWJjNjg1NjQ5MWY1MCIsInN1YiI6Ijk5MjExMDMxNjdAbWFpbC5qaWl0LmFjLmluIn0sImNvbXBhbnlOYW1lIjoiYW5tYXJ0IiwiY2xpZW50SUQiOiI2ZjRkMjE0MS00NDI3LTQzNjEtYTk0Yi1iYzY4NTY0OTFmNTAiLCJjbGllbnRTZWNyZXQiOiJrT1RzcXJ3d0pjanhDYkxkIiwib3duZXJOYW1lIjoiQW5hbnlhIiwib3duZXJFbWFpbCI6Ijk5MjExMDMxNjdAbWFpbC5qaWl0LmFjLmluIiwicm9sbE5vIjoiOTkyMTEwMzE2NyJ9.pbCw-NsJY7a3pFgct7nwjIcv7taW8q-K7WEdBAbD4Ec'; // Replace 'your_auth_token' with your actual auth token
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      };
      apiEndpoint = 'primes'
      const response = await axios.get(`http://20.244.56.144/test/${apiEndpoint}`, config);// Concatenate apiEndpoint with '/api' prefix
      const data = response.data;
      const newNumbers = data.numbers.slice(0, WINDOW_SIZE); // Take the first WINDOW_SIZE numbers from the response
      updateState(newNumbers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  ;
  

  const updateState = (newNumbers) => {
    const prevNumbers = [...windowCurrState]; // Copy current state as previous state
    setWindowPrevState(prevNumbers);
    const updatedCurrState = [...windowCurrState, ...newNumbers].slice(-WINDOW_SIZE); // Concatenate new numbers and keep only the last WINDOW_SIZE numbers
    setWindowCurrState(updatedCurrState);
    setNumbers(updatedCurrState);
    const average = calculateAverage(updatedCurrState);
    setAvg(average);
  };

  const calculateAverage = (nums) => {
    if (nums.length === 0) return 0;
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    return sum / nums.length;
  };

  const handleNumberId = (apiEndpoint) => {
    fetchData(apiEndpoint);
  };
  

  return (
    <div className="container">
      <div className="button-group">
        <button className="button" onClick={() => handleNumberId('primes')}>Prime</button>
        <button className="button" onClick={() => handleNumberId('fibo')}>Fibonacci</button>
        <button className="button" onClick={() => handleNumberId('even')}>Even</button>
        <button className="button" onClick={() => handleNumberId('rand')}>Random</button>
      </div>
      <div className="number-container">
        <div className="number-section">
          <h2 className="number-heading">Previous Window State:</h2>
          <ul className="number-list">
            {windowPrevState.map((num, index) => (
              <li key={index} className="number-list-item">{num}</li>
            ))}
          </ul>
        </div>
        <div className="number-section">
          <h2 className="number-heading">Current Window State:</h2>
          <ul className="number-list">
            {windowCurrState.map((num, index) => (
              <li key={index} className="number-list-item">{num}</li>
            ))}
          </ul>
        </div>
        <div className="number-section">
          <h2 className="number-heading">Numbers:</h2>
          <ul className="number-list">
            {numbers.map((num, index) => (
              <li key={index} className="number-list-item">{num}</li>
            ))}
          </ul>
        </div>
        <div className="average">
          <h2>Average: {avg.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
};

export default AverageCalculator;
