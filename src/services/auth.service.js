import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = "http://192.168.1.4:1234/users/";

const register = (name, email, password) => {
  return axios.post(API_URL + "register", {
    headers: {
      "Content-Type": "application/json",
    },
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  const data = {
    email,
    password,
  };

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log("login called");
  return axios.post(API_URL + "login", data, options).then((response) => {
    if (response.data.payload.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data.payload));
    }
    console.log(response);
    return response.data;
  });
};

const searchUser = (search, accessToken) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken,
    },
    qparams: {
      search,
    },
  };
  console.log("search called");
  return axios.get(API_URL + "search", options);
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
  searchUser,
};
