import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Leaves = () => {
  const [leaveForm, setLeaveForm] = useState({
    from: "",
    to: "",
    reason: "",
    type: "Casual Leave",
  });

  const [leaves, setLeaves] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLeave = {
      id: uuidv4(),
      ...leaveForm,
      status: "Pending",
    };
    setLeaves([newLeave, ...leaves]);
    setLeaveForm({ from: "", to: "", reason: "", type: "Casual Leave" });
  };

  const cancelLeave = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this leave?"
    );
    if (confirm) {
      setLeaves(leaves.filter((leave) => leave.id !== id));
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-center">🗓️ Leave Application</h2>

      {/* Leave Form */}
      <div className="card shadow-sm border-0 mb-5">
        <div className="card-body">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-4">
              <label className="form-label">From Date</label>
              <input
                type="date"
                name="from"
                className="form-control"
                value={leaveForm.from}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">To Date</label>
              <input
                type="date"
                name="to"
                className="form-control"
                value={leaveForm.to}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Leave Type</label>
              <select
                name="type"
                className="form-select"
                value={leaveForm.type}
                onChange={handleChange}
              >
                <option value="Casual Leave">Casual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Paid Leave">Paid Leave</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Reason</label>
              <textarea
                name="reason"
                className="form-control"
                rows="2"
                value={leaveForm.reason}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="col-12 text-end">
              <button
                type="submit"
                className="btn btn-primary px-4 fw-semibold"
              >
                Apply Leave
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Leave List */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white fw-semibold">
          📋 Applied Leaves ({leaves.length})
        </div>
        <div className="card-body p-0">
          {leaves.length === 0 ? (
            <div className="text-center text-muted py-4">
              No leave applications yet.
            </div>
          ) : (
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Type</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave, index) => (
                  <tr key={leave.id}>
                    <td>{index + 1}</td>
                    <td>{leave.from}</td>
                    <td>{leave.to}</td>
                    <td>{leave.type}</td>
                    <td>{leave.reason}</td>
                    <td>
                      <span className="badge bg-warning">{leave.status}</span>
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => cancelLeave(leave.id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaves;
