import axios from "axios";

const instance = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV !== "production"
      ? "http://localhost:3500/api/"
      : "https://lballanger.fr/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

const REFRESH_KEY = "REFRESH_KEY";

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.config.url !== "/auth/refresh-token" &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(REFRESH_KEY);
      if (refreshToken && refreshToken !== "") {
        instance.defaults.headers.common.authorization = `Bearer ${refreshToken}`;
        try {
          const { data } = await instance.post("/auth/refresh-token");
          instance.defaults.headers.common.authorization = `Bearer ${data.accessToken}`;
          originalRequest.headers.authorization = `Bearer ${data.accessToken}`;
        } catch (error) {
          localStorage.removeItem(REFRESH_KEY);
        }
        return instance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
