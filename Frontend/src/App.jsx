// import { useState } from 'react'
import { Outlet } from "react-router-dom";
import progressaLogo from './assets/imgs/logo.png'
import Sidebar from "./assets/components/Sidebar/Sidebar";
import './App.css'

function DashboardLayout() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="page-content">
        <Outlet />
      </main>

    </div>
  );
}

export default DashboardLayout;
