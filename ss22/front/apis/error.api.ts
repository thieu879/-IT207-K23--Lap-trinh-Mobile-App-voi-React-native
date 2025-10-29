import { ErrorResponse } from "@/utils/error-response";
import { isAxiosError } from "axios";

export const handleAxiosError = (error: any): ErrorResponse => {
  if (isAxiosError(error)) {
    if (error.response) {
      const data = error.response.data as Partial<ErrorResponse>;
      return {
        message: data.message || "An error occurred",
        error: data.error || "Server Error",
        statusCode: data.statusCode || error.response.status || 500,
      };
    }
    if (error.request) {
      return {
        message: "No response from server",
        error: "Network Error",
        statusCode: 503,
      };
    }
    return {
      message: error.message || "Unknown Axios error",
      error: "AxiosError",
      statusCode: 500,
    };
  }
  return {
    message: (error && error.message) || "Unexpected error occurred",
    error: "Unhandled",
    statusCode: 500,
  };
};
