import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://127.0.0.1:5000/api";

const API = axios.create({
  baseURL: baseURL,
});

API.interceptors.request.use((req) => {
  if (Cookies.get("token")) {
    req.headers["Authorization"] = `Bearer ${Cookies.get("token")}`;
  }
  return req;
});


