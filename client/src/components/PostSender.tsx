import { AxiosRequestConfig, CanceledError } from "axios";
import apiClient from "../components/services/api-client";

interface ApiResponse {
  message: string;
}

const PostSender = async (
  endpoint: string,
  postData: any,
  setStatus: (code: number) => void,
  setMessage: (mes: string) => void,
  setError: (error: string) => void,
  requestConfig?: AxiosRequestConfig
) => {
  const controller = new AbortController();

  if (!postData) return;
  console.log("PostSender is working");
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
      if (err.response) {
        setStatus(err.status);
        setError(err.response.data.message);
      }
    });
};

export default PostSender;
