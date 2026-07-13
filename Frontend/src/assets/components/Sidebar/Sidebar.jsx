import "./Sidebar.css";
import progressaLogo from "../../imgs/logo.png";
import { HomeIcon } from "../../components/svg components/HomeIcon.jsx";
import { MealsIcon } from "../../components/svg components/MealsIcon.jsx";
import { FoodsIcon } from "../../components/svg components/FoodsIcon.jsx";
import { WorkoutsIcon } from "../../components/svg components/WorkoutsIcon.jsx";
import { ProgressIcon } from "../../components/svg components/ProgressIcon.jsx";
import { ProfileIcon } from "../../components/svg components/ProfileIcon.jsx";
import { SettingsIcon } from "../../components/svg components/SettingsIcon.jsx";
import { LogoutIcon } from "../../components/svg components/LogoutIcon.jsx";
import { useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

export function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="logout-modal">
        <div className="modal-icon">!</div>

        <h2>Logout</h2>

        <p>Are you sure you want to logout?</p>

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>

          <button className="logout-btn" onClick={onConfirm}>
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const { username } = useParams();
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div className="sidebar-div">
        <div className="content">
          <div className="sidebar-head">
            <img src={progressaLogo} alt="" />
            <h3>Progressa</h3>
          </div>
          <NavLink to={`/${username}/dashboard`} className="pages">
            <HomeIcon className="sidebar-icon" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink to={`/${username}/meals`} className="pages">
            <MealsIcon className="sidebar-icon" />
            <p>Meals</p>
          </NavLink>
          <NavLink to={`/${username}/foods`} className="pages">
            <FoodsIcon className="sidebar-icon" />
            <p>Foods</p>
          </NavLink>
          <NavLink to={`/${username}/workouts`} className="pages">
            <WorkoutsIcon className="sidebar-icon" pathClass="icon-path" />
            <p>Workouts</p>
          </NavLink>
          <NavLink to={`/${username}/progress`} className="pages">
            <ProgressIcon className="sidebar-icon" />
            <p>Progress</p>
          </NavLink>
          <NavLink to={`/${username}/profile`} className="pages">
            <ProfileIcon className="sidebar-icon" />
            <p>Profile</p>
          </NavLink>
          <NavLink to={`/${username}/settings`} className="pages">
            <SettingsIcon className="sidebar-icon" />
            <p>Settings</p>
          </NavLink>
        </div>
        <div className="logout-div" onClick={() => setShowLogout(true)}>
          <LogoutIcon className="sidebar-icon" />
          <p>Logout</p>
        </div>
        {showLogout && (
          <LogoutModal
            onCancel={() => setShowLogout(false)}
            onConfirm={() => {
              setShowLogout(false);
              navigate("/");
            }}
          />
        )}
      </div>
    </>
  );
}
