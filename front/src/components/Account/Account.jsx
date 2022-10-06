import "./Account.scss";

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import AccountMenu from "./AccountMenu/AccountMenu";

function Account() {
  const userData = useSelector((state) => state.userSlice.userData);

  return (
    <div className="account">
      <AccountMenu userData={userData} />
      <Outlet userData={userData} />
    </div>
  );
}

export default Account;
