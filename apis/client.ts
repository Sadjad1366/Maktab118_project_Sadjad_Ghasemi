import axios from "axios";

export const client = axios.create({
  baseURL: "http://backend-6us4acis1-sadjad1366s-projects.vercel.app/api",
  timeout: 1000,
});
