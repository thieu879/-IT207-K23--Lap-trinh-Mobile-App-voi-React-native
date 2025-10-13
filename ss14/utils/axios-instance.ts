import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://nest-api-public.ixe-agent.io.vn/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksInJvbGUiOiJRdeG6o24gbMO9Iiwic3RhdHVzIjoiQUNUSVZFIiwiZGV2aWNlSWQiOiIxZjAyNWU5NC0zNGEwLTZlZTAtOWVhOC0zMGJiMjA0MjMyY2YiLCJpYXQiOjE3NjAyOTkyNDMsImV4cCI6MTc2MDMwMDE0M30.TJ7IXMs1rry2lO99DdZhnBsQTG9Y8LBO4bO4vkt-BWU",
  },
  timeout: 10000,
});