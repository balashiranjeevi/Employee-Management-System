import React, { useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

// Reusable Sidebar Link component
const SidebarLink = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        className={`nav-link text-white px-3 py-2 ${
          isActive ? "bg-secondary" : ""
        }`}
      >
        <i className={`bi ${icon} me-2`}></i>
        <span className="d-none d-sm-inline">{label}</span>
      </Link>
    </li>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const handleLogout = async () => {
    try {
      const result = await axios.get("http://localhost:3000/auth/logout");
      if (result.data.Status) {
        navigate("/adminlogin");
      } else {
        alert("Logout failed.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {/* Sidebar */}
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark shadow-sm min-vh-100">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 text-white">
            <Link
              to="/dashboard"
              className="d-flex align-items-center mb-3 text-white text-decoration-none"
            >
              <span className="fs-4 fw-bold d-none d-sm-inline">
                Code with Bala
              </span>
            </Link>
            <hr className="border-white w-100" />

            {/* Navigation Links */}
            <ul className="nav nav-pills flex-column mb-auto w-100" id="menu">
              <SidebarLink
                to="/dashboard"
                icon="bi-speedometer2"
                label="Dashboard"
              />
              <SidebarLink
                to="/dashboard/employee"
                icon="bi-people"
                label="Manage Employees"
              />
              <SidebarLink
                to="/dashboard/category"
                icon="bi-columns"
                label="Category"
              />
              <SidebarLink
                to="/dashboard/profile"
                icon="bi-person"
                label="Profile"
              />
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-link nav-link text-white px-3 py-2 text-start"
                >
                  <i className="bi bi-power me-2"></i>
                  <span className="d-none d-sm-inline">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col p-0">
          <nav className="navbar navbar-light bg-light shadow-sm px-4">
            <span className="navbar-brand mb-0 h4 fw-semibold">
              Employee Management System
            </span>
          </nav>
          <div className="p-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
