import axios from "axios";

export const client = axios.create({
  baseURL: "https://backend-app-gamma.vercel.app/api",
  timeout: 1000,
});
