import React, { useEffect, useState } from "react";
import taskData from "../data/taskData";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons CSS
import "./Tasks.css"; // Optional: custom styles

const Tasks = () => {
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const initialTasks = taskData.slice(0, 20);
    const active = initialTasks
      .filter((task) => task.status !== "Completed")
      .slice(0, 6);
    const completed = initialTasks.filter(
      (task) => task.status === "Completed"
    );

    setActiveTasks(active);
    setCompletedTasks(completed);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setActiveTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );

    if (newStatus === "Completed") {
      const taskToMove = activeTasks.find((task) => task.id === id);
      if (taskToMove) {
        setCompletedTasks((prev) => [
          ...prev,
          { ...taskToMove, status: "Completed" },
        ]);
        setActiveTasks((prev) => prev.filter((task) => task.id !== id));
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning text-dark";
      case "In Progress":
        return "bg-primary text-white";
      case "Completed":
        return "bg-success text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h3 className="fw-bold text-primary border-bottom pb-2">
          <i className="bi bi-kanban-fill me-2"></i> Task Dashboard
        </h3>
        <p className="text-muted">
          Track your current and completed tasks efficiently
        </p>
      </div>

      <section className="mb-5">
        <h5 className="fw-semibold text-dark mb-3">
          <i className="bi bi-list-task me-2 text-warning"></i> Active Tasks
        </h5>
        {activeTasks.length === 0 ? (
          <p className="text-muted text-center">No active tasks available.</p>
        ) : (
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-bordered table-striped align-middle">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Task</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {activeTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td className="fw-semibold">{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                      <select
                        className={`form-select form-select-sm ${getStatusClass(
                          task.status
                        )}`}
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td>{new Date(task.deadline).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h5 className="fw-semibold text-success mb-3">
          <i className="bi bi-check-circle-fill me-2 text-success"></i>{" "}
          Completed Tasks
        </h5>
        {completedTasks.length === 0 ? (
          <p className="text-muted">No tasks completed yet.</p>
        ) : (
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-success text-dark">
                <tr>
                  <th>ID</th>
                  <th>Task</th>
                  <th>Description</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {completedTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td className="fw-semibold">{task.title}</td>
                    <td>{task.description}</td>
                    <td>{new Date(task.deadline).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Tasks;
