import { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../components/services/api-client";

interface ApiResponse {
  message: string;
}

const usePost = (
  endpoint: string,
  postData: any,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const controller = new AbortController();
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(
    () => {
      console.log("usePost is working");
      if (!postData) return;
      apiClient
        .post<ApiResponse>(endpoint, postData, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res) => {
          setStatus(res.status);
          setMessage(res.data.message);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
        });
    },
    deps ? [...deps] : []
  );
  console.log({ status, message, error });
  return { status, message, error };
};

export default usePost;
