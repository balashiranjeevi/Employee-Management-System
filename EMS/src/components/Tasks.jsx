import React, { useEffect, useState } from "react";
import taskData from "../data/taskData";

const Tasks = () => {
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const initialTasks = taskData.slice(0, 20); // first 20 tasks
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

    // If the new status is "Completed", move it to completedTasks
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

  return (
    <div className="container py-4">
      <h4 className="mb-4 fw-bold">📋 Assigned Tasks (Active)</h4>

      {activeTasks.length === 0 ? (
        <p className="text-muted text-center">No active tasks assigned.</p>
      ) : (
        <div className="table-responsive shadow-sm mb-5">
          <table className="table table-striped">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Task</th>
                <th>Description</th>
                <th>Status</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {activeTasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <select
                      className="form-select"
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

      <h5 className="fw-bold mb-3">✅ Completed Tasks</h5>

      {completedTasks.length === 0 ? (
        <p className="text-muted">No tasks completed yet.</p>
      ) : (
        <div className="table-responsive shadow-sm">
          <table className="table table-bordered table-hover">
            <thead className="table-success">
              <tr>
                <th>#</th>
                <th>Task</th>
                <th>Description</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
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
