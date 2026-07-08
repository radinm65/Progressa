// import { useState } from 'react'
import { Outlet } from "react-router-dom";
import progressaLogo from './assets/imgs & svgs/logo.png'
import {Sidebar} from "./assets/components/Sidebar/Sidebar.jsx";
import './App.css'

export default function App() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="page-content">
        <Outlet />
      </main>

    </div>
  );
}

