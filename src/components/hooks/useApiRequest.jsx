import { useState, useEffect } from 'react';

export const useApiRequest = (url, initialState = null) => {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const responseData = await response.json();
        setData(responseData);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [url]);

  return { data, error };
};
