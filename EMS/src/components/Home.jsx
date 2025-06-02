import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [adminRes, employeeRes, salaryRes, adminListRes] =
          await Promise.all([
            axios.get("http://localhost:3000/auth/admin_count"),
            axios.get("http://localhost:3000/auth/employee_count"),
            axios.get("http://localhost:3000/auth/salary_count"),
            axios.get("http://localhost:3000/auth/admin_records"),
          ]);

        if (adminRes.data.Status) setAdminTotal(adminRes.data.Result[0].admin);
        if (employeeRes.data.Status)
          setEmployeeTotal(employeeRes.data.Result[0].employee);
        if (salaryRes.data.Status)
          setSalaryTotal(salaryRes.data.Result[0].salary);
        if (adminListRes.data.Status) setAdmins(adminListRes.data.Result);

        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading)
    return <div className="text-center mt-5">Loading dashboard...</div>;
  if (error)
    return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container py-4">
      {/* Dashboard Stats */}
      <div className="row g-4">
        <StatCard title="Admins" value={adminTotal} />
        <StatCard title="Employees" value={employeeTotal} />
        <StatCard title="Salaries" value={`₹ ${salaryTotal}`} />
      </div>

      {/* Admin List */}
      <div className="card shadow-sm border-0 mt-5">
        <div className="card-header bg-white">
          <h5 className="mb-0">List of Admins</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>S.no</th>
                <th>Email</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={admin.email}>
                  <td>{index + 1}</td>
                  <td>{admin.email}</td>
                  <td className="text-end">
                    <a
                      href={`mailto:${admin.email}`}
                      className="btn btn-dark btn-sm fw-bold"
                    >
                      Send Email
                    </a>
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-3">
                    No admin records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// 💡 Reusable Stat Card Component
const StatCard = ({ title, value }) => (
  <div className="col-md-4">
    <div className="card shadow-sm border-0">
      <div className="card-body text-center">
        <h6 className="card-title text-muted">{title}</h6>
        <h3 className="fw-bold">{value}</h3>
      </div>
    </div>
  </div>
);

export default Home;
