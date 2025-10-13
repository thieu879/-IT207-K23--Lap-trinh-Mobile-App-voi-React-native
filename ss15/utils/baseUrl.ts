import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseUrl = axios.create({
  baseURL: "https://nest-api-public.ixe-agent.io.vn/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

baseUrl.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

baseUrl.interceptors.response.use(async (response) => {
    if (response.statusCode === 401) {
        try {
            const response = await baseUrl.post("/auths/refresh-token", {
                refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExOCwiaWF0IjoxNzYwMzc2MTY0LCJleHAiOjE3NjA5ODA5NjR9.0Re4mCk04R8Z_NxoHRYDwWCMK27ag7kUfbiP7zIgEKg"
            });
            if (response) {
                const newAccessToken = response.data.accessToken;
                await AsyncStorage.setItem("accessToken", JSON.stringify(newAccessToken));
                response.config.headers.Authorization = `Bearer ${newAccessToken}`;
                return (await axios(response.config)).data;
            }
        } catch (error) {
            alert(error);
            return Promise.reject(error);
        }
    }
})