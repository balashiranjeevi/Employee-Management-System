import React, { useState, useEffect } from "react";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/employee/tasks");
        if (res.data.Status) {
          setTasks(res.data.Result);
        } else {
          setError("Failed to fetch tasks.");
        }
      } catch (err) {
        setError("Error while fetching tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading tasks...</div>;
  if (error)
    return <div className="alert alert-danger mt-4 text-center">{error}</div>;

  return (
    <div className="container py-4">
      <h4 className="mb-4 fw-bold">📝 My Tasks</h4>
      {tasks.length === 0 ? (
        <div className="text-muted text-center">No tasks assigned yet.</div>
      ) : (
        <div className="table-responsive shadow-sm">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <span
                      className={`badge ${
                        task.status === "Completed"
                          ? "bg-success"
                          : task.status === "Pending"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td>{new Date(task.deadline).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Tasks;
