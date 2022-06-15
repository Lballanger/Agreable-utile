import { useSelector } from "react-redux";

const useAuth = () => {
  return useSelector((state) => state.userSlice.user);
};

export default useAuth;
