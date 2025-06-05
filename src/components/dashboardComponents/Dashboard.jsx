// The Dashbaord will consist of the following components:
// An overview of the overall progress of the user:
// Projects, tasks, notes
// calculated progress
// action buttons for creating new projects, tasks and notes

import DashboardButtonBar from "./DashboardButtonBar";
import DashGraph from "./DashGraph";
import DashProjectPrev from "./DashProjectPrev";
import DashTaskPrev from "./DashTaskPrev";

const Dashboard = () => {
  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <p>
        Welcome to your dashboard! Here you can see an overview of your
        projects, tasks, and notes.
      </p>
      <p>You can also fast-create new projects, tasks, and notes from here.</p>
      <DashGraph />
      <DashProjectPrev />
      <DashTaskPrev />
    </div>
  );
};

export default Dashboard;
