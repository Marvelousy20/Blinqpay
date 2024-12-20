import { notify } from "@/components/ui/toast";
import { useRediret } from "@/hooks/useRedirect";
import { fmtResponse, getToken, hasToken, removeToken } from "@/lib/utils";
import axios, { AxiosRequestConfig } from "axios";

// let baseURL = "https://blinq-be-78cd13298835.herokuapp.com/api/v1";
let baseURL = "https://blinq-api.onrender.com/api/v1";

const service = axios.create({
  baseURL,
  headers: {
    // "X-API-KEY": "idris",
    // "iden-unique_key": "quadraple-and-hello-edfojoidfj",
  },
});

// request interceptor
service.interceptors.request.use(
  // @ts-ignore
  async (config: AxiosRequestConfig) => {
    if (config.headers === undefined) {
      config.headers = {};
    }

    if (hasToken() && getToken() !== false) {
      config.headers.Authorization = `Bearer ${String(getToken())}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
service.interceptors.response.use(
  // @ts-ignore
  function (response) {
    const { data } = response;

    return fmtResponse(response, false);
  },

  function (error) {
    console.log(error, "response interceptor error");

    const { response } = error;

    const unauthorized = [
      "Invalid authentication. Try again!",
      "No token provided",
      "there was a problem retrieving your profile",
    ];

    if (unauthorized.includes(response?.data.message)) {
      // localStorage.clear();
      removeToken();
      // window.localStorage.clear();
      window.localStorage.removeItem("selectedBankId");
      window.location.href = "/auth";
      notify.error(response?.data.message);
    }

    if (error && !error?.response?.data) {
      return {
        error: true,
        serverResponse: error.message,
      };
    } else {
      const {
        response: { data },
      } = error;

      return {
        error: true,
        serverResponse: data,
      };
    }
  }
);

export default service;
