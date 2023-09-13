import { useState, useEffect } from 'react';

//Peticion Get con Refetch asincrono
export const useFetchGet = (endpoint) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + endpoint);
        let jsonData = '';
        if(response.ok){
          jsonData = await response.json();
        }
        else{
          let errorMessage = 'Error desconocido';
          if (response.status === 404) {
            errorMessage = 'La página solicitada no se encontró (Error 404)';
          } else if (response.status === 500) {
            errorMessage = 'Error interno del servidor (Error 500)';
          }
          throw new Error(errorMessage);
        }
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    if(refetch && endpoint.length > 0){
      fetchData();
      setRefetch(false)
    }
    
  }, [endpoint, refetch]);

  return { data, isLoading, error, setRefetch };
};