import { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth";
import { baseUrl } from "../utils/baseUrl";

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await baseUrl.post("/auths/login", credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await baseUrl.post("/auths/register", userData);
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const response = await baseUrl.post("/auths/refresh-token", { refreshToken });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await baseUrl.post("/auths/logout");
  },
};
