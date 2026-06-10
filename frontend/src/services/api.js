import axios from "axios";

const api = axios.create({
  baseURL: "https://helpdesk-ticketing-system-production.up.railway.app",
});

export default api;
