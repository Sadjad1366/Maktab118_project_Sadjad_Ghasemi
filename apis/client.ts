import axios from "axios";

export const client = axios.create({
  baseURL: "backend-6us4acis1-sadjad1366s-projects.vercel.app/api",
  timeout: 1000,
});
