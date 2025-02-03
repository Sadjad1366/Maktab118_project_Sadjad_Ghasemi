import axios from "axios";

export const client = axios.create({
  baseURL: "bhttps://backend-app-gamma.vercel.app/api",
  timeout: 1000,
});
