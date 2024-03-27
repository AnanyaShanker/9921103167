import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/numbers/all');
      const data = response.data;
      const prevNumbers = windowCurrState.slice(); // Copy current state as previous state
      setWindowPrevState(prevNumbers);
      const newNumbers = data.numbers.slice(0, 10); // Take the first 10 numbers from the response
      setWindowCurrState(newNumbers);
      setNumbers(newNumbers);
      const average = calculateAverage(newNumbers);
      setAvg(average);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateAverage = (nums) => {
    if (nums.length === 0) return 0;
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    return sum / nums.length;
  };

  const handleNumberId = async (apiEndpoint) => {
    try {
      const response = await axios.get(apiEndpoint);
      const data = response.data;
      const newNumbers = data.numbers.slice(0, 10); // Take the first 10 numbers from the response
      setWindowPrevState(windowCurrState);
      setWindowCurrState(newNumbers);
      setNumbers(newNumbers);
      const average = calculateAverage(newNumbers);
      setAvg(average);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button onClick={() => handleNumberId('http://20.244.56.144/test/primes')}>Prime</button>
      <button onClick={() => handleNumberId('http://20.244.56.144/test/fibo/f')}>Fibonacci</button>
      <button onClick={() => handleNumberId('http://20.244.56.144/test/even')}>Even</button>
      <button onClick={() => handleNumberId('http://20.244.56.144/test/rand')}>Random</button>
      <div>
        <h2>Previous Window State: {JSON.stringify(windowPrevState)}</h2>
        <h2>Current Window State: {JSON.stringify(windowCurrState)}</h2>
        <h2>Numbers: {JSON.stringify(numbers)}</h2>
        <h2>Average: {avg.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default AverageCalculator;
