import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        navigate("/adminlogin");
      }
    });
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {/* Sidebar */}
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark shadow-sm min-vh-100">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 text-white">
            <Link
              to="/dashboard"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-4 fw-bold d-none d-sm-inline">
                Code with Bala
              </span>
            </Link>
            <hr className="border-white w-100" />

            {/* Navigation Links */}
            <ul className="nav nav-pills flex-column mb-auto w-100" id="menu">
              <li>
                <Link to="/dashboard" className="nav-link text-white px-3 py-2">
                  <i className="bi bi-speedometer2 me-2"></i>
                  <span className="d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/employee"
                  className="nav-link text-white px-3 py-2"
                >
                  <i className="bi bi-people me-2"></i>
                  <span className="d-none d-sm-inline">Manage Employees</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/category"
                  className="nav-link text-white px-3 py-2"
                >
                  <i className="bi bi-columns me-2"></i>
                  <span className="d-none d-sm-inline">Category</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/profile"
                  className="nav-link text-white px-3 py-2"
                >
                  <i className="bi bi-person me-2"></i>
                  <span className="d-none d-sm-inline">Profile</span>
                </Link>
              </li>
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
