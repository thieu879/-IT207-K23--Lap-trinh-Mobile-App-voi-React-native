import axios from "axios";
import { Alert } from "react-native";

const axiosInstance = axios.create({
  baseURL: "https://api.ixe-agent.io.vn/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEzLCJyb2xlIjoiS2jDoWNoIGjDoG5nIiwic3RhdHVzIjoiQUNUSVZFIiwiZGV2aWNlSWQiOiIxZjAyNWU5NC0zNGEwLTZlZTAtOWVhOC0zMGJiMjA0MjMyY2YiLCJpYXQiOjE3NjA1OTkxMjcsImV4cCI6MTc2MDYwMDkyN30.BVLXX7Zd9UpOOF9ctwdzRvDSaBSJpnhvzYd7-gT6pq0";
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          "https://nest-api-public.ixe-agent.io.vn/api/v1/auths/refresh-token",
          {
            refreshToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEzLCJpYXQiOjE3NjA1OTkxMjcsImV4cCI6MTc2MTIwMzkyN30.SBB77N4bNR4KYy1p-8l2eFL1zpRQzE2RQ2h-kvNe7xY",
          }
        );

        const { accessToken } = response?.data?.data;
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        Alert.alert(
          "Cảnh báo",
          "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại"
        );
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
