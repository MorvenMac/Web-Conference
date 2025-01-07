import { useEffect, useState, useCallback } from "react";

const useFetchData = () => {
  const [status, setStatus] = useState('idle');
  const [talks, setTalks] = useState([]);  // Change state to store talks data

  const fetchData = useCallback(() => {
    const url = "http://localhost:3001/talks";  // Replace with your talks API URL
    fetch(url)
      .then((response) => response.json())
      .then((incomingData) => {
        console.log(incomingData);  // You can log it to see the structure
        setTalks(incomingData);  // Set the fetched talks data
        setStatus('fetched');  // Change status to fetched
      })
      .catch((err) => {
        console.error(err);  // Handle any fetch errors
        setStatus('error');  // Change status to error in case of failure
      });
  }, []);  // Empty dependency array ensures fetchData is only created once

  useEffect(() => {
    fetchData();  // Call fetchData when the component mounts
  }, [fetchData]);

  return { status, talks };  // Return both status and talks data
};

export default useFetchData;
