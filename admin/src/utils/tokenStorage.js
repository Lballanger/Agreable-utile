export const getToken = () => {
  return localStorage.getItem("REFRESH_KEY");
};

export const removeToken = () => {
  return localStorage.removeItem("REFRESH_KEY");
};

export const setToken = (token) => {
  return localStorage.setItem("REFRESH_KEY", token);
};
