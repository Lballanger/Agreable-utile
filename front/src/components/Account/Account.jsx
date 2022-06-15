import "./Account.scss";

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import AccountMenu from "./AccountMenu/AccountMenu";

function Account() {
  const userData = useSelector((state) => {
    return {
      id: state.userSlice.user.id,
      civility: state.userSlice.user.civility,
      firstname: state.userSlice.user.firstname,
      lastname: state.userSlice.user.lastname,
      email: state.userSlice.user.email,
      city: state.userSlice.user.city,
      date_of_birth: state.userSlice.user.date_of_birth,
    };
  });

  return (
    <div className="account">
      <AccountMenu userData={userData} />
      <Outlet />
    </div>
  );
}

export default Account;
