// this is the main area for the left side bar; in it is the project-dropdown and the task list (at least in dashboard-mode)

import ProjectDropDown from "./ProjectDropDown";
import TaskList from "./TaskList";
import DashMenuLeft from "./DashMenuLeft";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const SideBarLeft = () => {
  const location = useLocation();

  // object with all the routes and their corresponding components to load dynamically
  const sidebarRoutes = {
    "/dashboard": [<ProjectDropDown />, <TaskList />, <DashMenuLeft />],
    "/profile": [<DashMenuLeft />],
  };

  // find the route that matches the current location (location -> looks for the "param" in the URL as pathname)
  const getSidebarContent = Object.keys(sidebarRoutes).find((route) =>
    location.pathname.startsWith(route)
  );
  if (!getSidebarContent)
    return <div className="sidebar-left">No content available</div>;

  // the outcome of the search is the key of the sidebarRoutes object to render all the needed components for this route
  const sidebarContent = sidebarRoutes[getSidebarContent];

  return (
    <div className="sidebar-left">
      {sidebarContent.map((component, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {component}
        </motion.div>
      ))}
    </div>
  );
};

export default SideBarLeft;
