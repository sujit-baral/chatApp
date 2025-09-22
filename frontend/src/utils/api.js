import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5050/api/v1", // adjust if your backend runs elsewhere
  withCredentials: true, // allow cookies for auth
});

export default API;
