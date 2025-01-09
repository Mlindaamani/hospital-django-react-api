import { useState, useEffect } from "react";
import { axiosInstance } from "../services/api/config";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export const useAPI = (method, url, payload = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        let response;
        switch (method) {
          case "GET":
            response = await axiosInstance.get(url);
            break;
          case "POST":
            response = await axiosInstance.post(url, payload);
            break;
          case "PUT":
            response = await axiosInstance.put(url, payload);
            break;
          case "DELETE":
            response = await axiosInstance.delete(url);
            break;
          default:
            throw new Error(`Unsupported HTTP method: ${method}`);
        }
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};
