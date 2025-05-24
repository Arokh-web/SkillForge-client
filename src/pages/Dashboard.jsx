// The Dashbaord will consist of the following components:
// An overview of the overall progress of the user:
// Projects, tasks, notes
// calculated progress
// action buttons for creating new projects, tasks and notes

import DashboardButtonBar from "../components/dashboardComponents/DashboardButtonBar";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Welcome to your dashboard! Here you can see an overview of your
        projects, tasks, and notes.
      </p>
      <DashboardButtonBar />
    </div>
  );
};

export default Dashboard;
