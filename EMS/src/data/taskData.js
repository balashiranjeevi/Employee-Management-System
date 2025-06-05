// src/data/taskData.js

const sampleTitles = [
  "Prepare Report",
  "Fix Bug #124",
  "Update Documentation",
  "Team Meeting Notes",
  "Client Call Summary",
  "Database Cleanup",
  "API Integration",
  "UI Testing",
  "Design Review",
  "Optimize Performance",
  "Security Audit",
  "Implement Feature X",
  "Conduct User Survey",
  "Refactor Code",
  "Update Dependencies",
  "Backup Database",
  "Code Review",
  "Performance Testing",
  "Integrate OAuth",
  "Write Test Cases",
  "Deploy Application",
];

const statuses = ["Pending", "In Progress", "Completed"];

// Helper to generate a random date (within next 30 days)
const randomDeadline = () => {
  const now = new Date();
  return new Date(now.getTime() + Math.floor(Math.random() * 30) * 86400000); // 86400000 = 1 day
};

// Generate 100 tasks
const generateTasks = () => {
  return Array.from({ length: 100 }, (_, id) => ({
    id: id + 1,
    title: sampleTitles[Math.floor(Math.random() * sampleTitles.length)],
    description: "This task is randomly generated for demonstration.",
    status: statuses[Math.floor(Math.random() * statuses.length)],
    deadline: randomDeadline(),
  }));
};
  
const taskData = generateTasks();

export default taskData;
