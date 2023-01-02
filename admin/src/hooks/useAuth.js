import { useSelector } from "react-redux";

const useAuth = () => {
  return useSelector((state) => state.authSlice.token);
};

export default useAuth;
