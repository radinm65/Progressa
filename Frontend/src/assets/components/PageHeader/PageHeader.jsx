import { SettingsIcon } from "../svg components/SettingsIcon";
import { LogoutIcon } from "../svg components/LogoutIcon";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./PageHeader.css";

function ProfileDropdown({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="profile-dropdown">
      <div className="profile-trigger" onClick={() => setOpen(!open)}>
        <img
          src={`/${user.profile_img}`}
          alt="profile"
          className="profile-picture"
        />

        <span className={open ? "arrow rotate" : "arrow"}>▼</span>
      </div>

      {open && (
        <div className="dropdown-menu">
          <NavLink to={`/${user.username}/settings`} className="dropdown-item">
            <SettingsIcon className="dropdown-icon" />
            <p>Settings</p>
          </NavLink>

          <NavLink to={`/`} className="dropdown-item dropdown-logout">
            <LogoutIcon className="dropdown-icon" />
            <p>Logout</p>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export function PageHeader({ user, pageTitle }) {
  const date = new Date().toDateString();
  return (
    <>
      <div className="dashboard-head">
        <div>
          <h1>{pageTitle}</h1>
          <h2>Hello, {user?.name} 👋</h2>
          <h3>Lets Crush Your Goals Today!</h3>
        </div>

        <div className="head-data-div">
          <div className="date-div">{date}</div>
          <div className="dropdown-div">
            <ProfileDropdown user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
