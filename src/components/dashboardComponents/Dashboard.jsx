// The Dashbaord will consist of the following components:
// An overview of the overall progress of the user:
// Projects, tasks, notes
// calculated progress
// action buttons for creating new projects, tasks and notes

import DashGraph from "./DashGraph";
import DashProjectPrev from "./DashProjectPrev";
import DashTaskPrev from "./DashTaskPrev";
import { useProjectContext } from "../../contexts/contexts";

const Dashboard = () => {
  const { selectedProject } = useProjectContext();
  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <p>
        Welcome to your dashboard! Here you can see an overview of your
        projects, tasks, and notes.
      </p>
      <p>You can also fast-create new projects, tasks, and notes from here.</p>

      <div className="flex m-5 gap-25">
        {selectedProject && <DashGraph />} <DashProjectPrev />
      </div>
      <DashTaskPrev />
    </div>
  );
};

export default Dashboard;
