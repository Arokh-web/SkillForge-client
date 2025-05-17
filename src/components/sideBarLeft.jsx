// this is the main area for the left side bar; in it is the project-dropdown and the task list (at least in dashboard-mode)

import ProjectDropDown from "./ProjectDropDown";
import TaskList from "./TaskList";

const SideBarLeft = () => {
  return (
    <div className="sidebar-left">
      <ProjectDropDown />
      <TaskList />
    </div>
  );
};

export default SideBarLeft;
