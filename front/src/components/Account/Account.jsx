import "./Account.scss";

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import AccountMenu from "./AccountMenu/AccountMenu";

function Account() {
  const userData = useSelector((state) => {
    return {
      id: state.userSlice.userData.id,
      civility: state.userSlice.userData.civility,
      firstname: state.userSlice.userData.firstname,
      lastname: state.userSlice.userData.lastname,
      email: state.userSlice.userData.email,
      city: state.userSlice.userData.city,
      date_of_birth: state.userSlice.userData.date_of_birth,
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
