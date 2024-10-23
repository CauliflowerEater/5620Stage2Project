import { AxiosRequestConfig, CanceledError } from "axios";
import apiClient from "../components/services/api-client";

interface ApiResponse {
  message: string;
}

const PostSender = (
  endpoint: string,
  postData: any,
  setStatus: (code: number) => void,
  setMessage: (mes: string) => void,
  setError: (error: string) => void,
  requestConfig?: AxiosRequestConfig
) => {
  const controller = new AbortController();

  console.log("PostSender is working");
  if (!postData) return;
  apiClient
    .post<ApiResponse>(endpoint, postData, {
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

export default PostSender;
