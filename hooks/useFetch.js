import { useState, useEffect } from 'react';
import axios from 'axios';

import { RAPID_API_KEY, RAPID_API_HOST } from '@env';

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      ...query,
    },
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST,
    },
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const { data } = await axios.request(options);
      setData(data.data);
    } catch (err) {
      setError(err);
      alert('There is an error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useFetch;
