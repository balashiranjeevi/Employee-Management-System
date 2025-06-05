import React, { useState } from "react";

const Attendance = () => {
  const [logs, setLogs] = useState({
    loginTime: null,
    lunchInTime: null,
    lunchOutTime: null,
    logoutTime: null,
  });

  const [status, setStatus] = useState("Not Started");

  const getTime = () => new Date().toLocaleTimeString();

  const handleAction = (action) => {
    setLogs((prev) => ({
      ...prev,
      [action]: getTime(),
    }));

    switch (action) {
      case "loginTime":
        setStatus("🟢 Working");
        break;
      case "lunchInTime":
        setStatus("🍴 On Lunch");
        break;
      case "lunchOutTime":
        setStatus("🟢 Working");
        break;
      case "logoutTime":
        setStatus("✅ Completed");
        break;
      default:
        break;
    }
  };

  return (
    <div className="container py-5">
      <div className="mb-4 text-center">
        <h2 className="fw-bold">🧑‍💼 Employee Daily Activity Tracker</h2>
        <p className="text-muted">
          Track your workday with time-stamped actions
        </p>
      </div>

      <div className="row g-4">
        {/* Action Panel */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white fw-semibold">
              ⏱️ Job Actions
            </div>
            <div className="card-body d-grid gap-3">
              <button
                className="btn btn-success btn-lg"
                onClick={() => handleAction("loginTime")}
                disabled={logs.loginTime}
              >
                ✅ Start Job
              </button>
              <button
                className="btn btn-warning btn-lg"
                onClick={() => handleAction("lunchInTime")}
                disabled={!logs.loginTime || logs.lunchInTime}
              >
                🍱 Lunch In
              </button>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => handleAction("lunchOutTime")}
                disabled={!logs.lunchInTime || logs.lunchOutTime}
              >
                ☕ Lunch Out
              </button>
              <button
                className="btn btn-danger btn-lg"
                onClick={() => handleAction("logoutTime")}
                disabled={!logs.loginTime || logs.logoutTime}
              >
                🚪 End Job
              </button>
            </div>
            <div className="card-footer bg-white mt-3">
              <h6 className="text-muted mb-0">
                <strong>Status:</strong>{" "}
                <span className="badge bg-dark fs-6">{status}</span>
              </h6>
            </div>
          </div>
        </div>

        {/* Timeline Panel */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white fw-semibold">
              📅 Today's Timeline
            </div>
            <div className="card-body px-4">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>🔓 Login Time</span>
                  <span className="fw-semibold text-success">
                    {logs.loginTime || "—"}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>🍱 Lunch In</span>
                  <span className="fw-semibold text-warning">
                    {logs.lunchInTime || "—"}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>☕ Lunch Out</span>
                  <span className="fw-semibold text-primary">
                    {logs.lunchOutTime || "—"}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>🚪 Logout Time</span>
                  <span className="fw-semibold text-danger">
                    {logs.logoutTime || "—"}
                  </span>
                </li>
              </ul>
            </div>
            <div className="card-footer text-center text-muted small">
              {logs.logoutTime
                ? "✔️ Attendance marked for today"
                : "🕒 Please complete your job to mark attendance"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
