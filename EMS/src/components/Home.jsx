import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
    // You may want to call similar functions for employee and salary here
  }, []);

  const AdminRecords = () => {
    axios.get("http://localhost:3000/auth/admin_records").then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    });
  };

  const adminCount = () => {
    axios.get("http://localhost:3000/auth/admin_count").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      } else {
        alert(result.data.Error);
      }
    });
  };

  const employeeCount = () => {
    axios.get("http://localhost:3000/auth/employee_count").then((result) => {
      if (result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee);
      } else {
        alert(result.data.Error);
      }
    });
  };

  const salaryCount = () => {
    axios.get("http://localhost:3000/auth/salary_count").then((result) => {
      if (result.data.Status) {
        setSalaryTotal(result.data.Result[0].salary);
      } else {
        alert(result.data.Error);
      }
    });
  };

  return (
    <div className="container py-4">
      {/* Dashboard Cards */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title text-muted">Admins</h5>
              <h3 className="card-text fw-bold">{adminTotal}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title text-muted">Employees</h5>
              <h3 className="card-text fw-bold">{employeeTotal}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title text-muted">Salaries</h5>
              <h3 className="card-text fw-bold">{salaryTotal}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Table */}
      <div className="card shadow-sm border-0 mt-5">
        <div className="card-header bg-white">
          <h5 className="mb-0">List of Admins</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Email</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.email}>
                  <td>{a.email}</td>
                  <td className="text-end">
                    <button className="btn btn-outline-primary btn-sm me-2">
                      Edit
                    </button>
                    <button className="btn btn-outline-danger btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
