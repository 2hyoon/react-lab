import { useState } from "react";
import { FetchError } from "@/src/types/type";

const useFetch = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FetchError | null>(null);

  const fetchData = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(url);
      if (response.ok) {
        const json: T = await response.json();
        setData(json);
      } else {
        setError({ type: "http", status: response.status });
      }
    } catch (err) {
      console.error(err);
      setError({ type: "network" });
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData };
};

export default useFetch;
