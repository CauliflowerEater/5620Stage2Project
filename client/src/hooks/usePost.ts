import { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../components/services/api-client";

const usePost = <T>(
  endpoint: string,
  postData: any,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const controller = new AbortController();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      //当postData为空时停止
      if (!postData) return;
      setLoading(true);
      apiClient
        .post<T>(endpoint, postData, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });
    },
    deps ? [...deps] : []
  );
  return { data, error, isLoading };
};

export default usePost;
