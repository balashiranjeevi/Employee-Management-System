import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/employee");
        if (res.data.Status) {
          setEmployees(res.data.Result);
        } else {
          setError(res.data.Error);
        }
      } catch (err) {
        setError("Failed to fetch employees.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `http://localhost:3000/auth/delete_employee/${id}`
      );
      if (res.data.Status) {
        alert("Employee deleted successfully");
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      } else {
        alert(res.data.Error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee.");
    }
  };

  if (loading)
    return <div className="text-center mt-5">Loading employees...</div>;
  if (error)
    return <div className="alert alert-danger mt-5 text-center">{error}</div>;

  return (
    <div className="px-5 mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Employee List</h3>
        <Link to="/dashboard/add_employee" className="btn btn-success">
          <i className="bi bi-plus-circle me-1"></i> Add Employee
        </Link>
      </div>

      {employees.length === 0 ? (
        <div className="text-center text-muted">No employees found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Email</th>
                <th>Address</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>
                    <img
                      src={`http://localhost:3000/images/${e.image}`}
                      alt={e.name}
                      className="rounded"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      onError={(e) => (e.target.src = "/default-avatar.png")}
                    />
                  </td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td>₹ {e.salary}</td>
                  <td>
                    <Link
                      to={`/dashboard/edit_employee/${e.id}`}
                      className="btn btn-info btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Employee;
