import { AxiosRequestConfig, CanceledError } from "axios";
import apiClient from "../components/services/api-client";

interface ApiResponse {
  message: string;
}

const GETSender = (
  endpoint: string,
  setStatus: (code: number) => void,
  setMessage: (mes: string) => void,
  setError: (error: string) => void,
  requestConfig?: AxiosRequestConfig
) => {
  const controller = new AbortController();

  console.log("PostSender is working");
  apiClient
    .get<ApiResponse>(endpoint, {
      signal: controller.signal,
      ...requestConfig,
    })
    .then((res) => {
      //   console.log(res.status + " " + res.data.message);
      setStatus(res.status);
      setMessage(res.data.message);
    })
    .catch((err) => {
      if (err instanceof CanceledError) return;
      if (err.response.data) {
        setStatus(err.status);
        setError(err.response.data.message);
      }
    });
};

export default GETSender;
