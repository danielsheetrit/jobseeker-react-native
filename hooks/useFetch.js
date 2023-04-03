import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// eslint-disable-next-line import/no-unresolved
import { RAPID_API_KEY, RAPID_API_HOST } from '@env';

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = useMemo(
    () => ({
      method: 'GET',
      url: `https://jsearch.p.rapidapi.com/${endpoint}`,
      params: {
        ...query,
      },
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': RAPID_API_HOST,
      },
    }),
    [endpoint, query]
  );

  const fetchData = async () => {
    setLoading(true);

    try {
      // eslint-disable-next-line no-shadow
      const { data } = await axios.request(options);
      setData(data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useFetch;
