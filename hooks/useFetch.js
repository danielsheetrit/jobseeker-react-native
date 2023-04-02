import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';

// eslint-disable-next-line import/no-unresolved
import { RAPID_API_KEY, RAPID_API_HOST } from '@env';

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = useMemo(() => ({
      method: 'GET',
      url: `https://jsearch.p.rapidapi.com/${endpoint}`,
      params: {
        ...query,
      },
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': RAPID_API_HOST,
      },
    }), [endpoint, query]);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const result = await axios.request(options);
      setData(result.data.data);
    } catch (err) {
      setError(err);
      // eslint-disable-next-line no-undef
      alert('There is an error');
    } finally {
      setLoading(false);
    }
  }, [options]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useFetch;
