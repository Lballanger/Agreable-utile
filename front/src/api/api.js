import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3500/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

const login = async (body) => {
  try {
    const { data } = await instance.post("/auth/login", body);
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export default {
  login,
};
