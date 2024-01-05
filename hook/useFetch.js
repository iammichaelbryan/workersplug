import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, params) => {
  const [data, setData] = useState([ ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: params,
    headers: {
      'X-RapidAPI-Key': 'c5bb3923c5mshbd3449c79fbcd1fp1554c2jsndadf20d29365',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
      console.log(error.response.data)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    //fetchData();
    
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;