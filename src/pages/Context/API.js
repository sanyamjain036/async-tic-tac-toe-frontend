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

export const register = (values) => {
  return API.post("/users", values);
};

export const login = (values) => {
  return API.post("/users/login", values);
};

export const createGame = (values) => {
  return API.post("/games/create", values);
};

export const updateGame = (id, values) => {
  return API.put(`/games/update/${id}`, values);
};

export const getGame = (id) => {
  return API.get(`/games/${id}`);
};

export const getAllGames = () => {
  return API.get(`/games`);
};
