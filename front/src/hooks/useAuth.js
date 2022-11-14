import { useSelector } from "react-redux";

const useAuth = () => {
  return useSelector((state) => state.userSlice.token);
};

export default useAuth;
