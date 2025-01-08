import { useEffect, useState, useCallback } from "react";

const useFetchData = () => {
  const [status, setStatus] = useState('idle');
  const [talks, setTalks] = useState([]);

  const fetchData = useCallback(() => {
    const url = process.env.REACT_APP_BACKEND_URL;

    fetch(`${backendUrl.replace(/\/$/, '')}/talks`)  // Remove trailing slash from base URL
      .then((response) => response.json())
      .then((data) => setTalks(data))
      .catch((err) => console.error("Error fetching talks:", err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { status, talks };
};

export default useFetchData;
