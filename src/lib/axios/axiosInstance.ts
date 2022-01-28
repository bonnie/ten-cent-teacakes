import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {};

if (process.env.NODE === "production") {
  config.baseURL = "https://tencentteacakes.com/";
} else {
  config.baseURL = process?.env?.VERCEL_URL || "http://localhost:3000/";
}

console.log("PROCESS.ENV", process.env);

// for canceling requests to avoid test errors
export const cancelTokenSource = axios.CancelToken.source();
if (process.env.NODE === "test") {
  config.cancelToken = cancelTokenSource.token;
}

export const axiosInstance = axios.create(config);
