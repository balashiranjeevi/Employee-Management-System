import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import axios from "axios";

const EmployeeHome = () => {
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState("");
  const [taskSummary, setTaskSummary] = useState({
    total: 6,
    completed: 2,
  });

  useEffect(() => {
    updateGreeting();
    fetchMotivationalQuote();
    // In a real scenario, fetch summary data from an API
  }, []);

  const updateGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  };

  const fetchMotivationalQuote = async () => {
    const quotes = [
      "Success is not final; failure is not fatal: It is the courage to continue that counts.",
      "Focus on being productive instead of busy.",
      "Quality means doing it right when no one is looking.",
      "Discipline is the bridge between goals and accomplishment.",
    ];
    const random = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[random]);
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container py-4">
      {/* Greeting & Date */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">{greeting},</h2>
        <p className="text-muted">{today}</p>
      </div>

      {/* Motivational Quote */}
      <div className="alert alert-secondary text-center fs-6 shadow-sm">
        <em>{quote}</em>
      </div>

      {/* Summary Cards */}
      <div className="row g-4 mt-4">
        <SummaryCard
          title="Tasks Assigned"
          value={taskSummary.total}
          icon="bi bi-list-task"
          color="primary"
        />
        <SummaryCard
          title="Tasks Completed"
          value={taskSummary.completed}
          icon="bi bi-check-circle"
          color="success"
        />
        <SummaryCard
          title="Attendance"
          value="Mark Today"
          icon="bi bi-calendar-check"
          color="warning"
          link="/dashboard/attendance"
        />
      </div>

      {/* Action Buttons */}
      <div className="text-center mt-5">
        <Link to="/dashboard/tasks" className="btn btn-outline-primary me-3">
          View Tasks
        </Link>
        <Link to="/dashboard/leaves" className="btn btn-outline-secondary">
          Apply Leave
        </Link>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, icon, color, link }) => {
  const content = (
    <Card className={`border-${color} shadow-sm h-100`}>
      <Card.Body className="text-center">
        <i className={`${icon} fs-2 text-${color}`}></i>
        <h6 className="mt-2 text-muted">{title}</h6>
        <h4 className="fw-semibold">{value}</h4>
      </Card.Body>
    </Card>
  );

  return (
    <div className="col-md-4">
      {link ? (
        <Link to={link} className="text-decoration-none text-dark">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
};

export default EmployeeHome;
