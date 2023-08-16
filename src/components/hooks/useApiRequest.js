import axios from 'axios';
import { useState, useEffect } from 'react';

export const useApiRequest = (url, initialState = null) => {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error };
};

