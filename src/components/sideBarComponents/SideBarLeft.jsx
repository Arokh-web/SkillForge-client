// this is the main area for the left side bar; in it is the project-dropdown and the task list (at least in dashboard-mode)

import ProjectDropDown from "./SideProjectDropDown";
import TaskList from "./SideTaskList";
import MenuLeft from "./MenuLeft";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthContext } from "../../contexts/contexts";
import AdminNavigation from "./AdminNavigation";
import { useEffect } from "react";

const SideBarLeft = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin" && location.pathname === "/signinup") {
      navigate("/adminpage");
    } else if (user.role === "user" && location.pathname === "/signinup") {
      navigate("/dashboard");
    }
  }, [user, location.pathname, navigate]);

  if (!user) {
    return (
      <div className="sidebar-left">
        <p className="text-4xl font-(family-name:--font-family-logo) text-white">
          Welcome to SkillForge!
        </p>
        <p className="text-white">
          Please log in to see your projects and tasks.
        </p>
        <p className="text-white">Sign up if you don't have an account!</p>
      </div>
    );
  }

  // object with all the routes and their corresponding components to load dynamically
  const sidebarRoutes = {
    "/dashboard": [<MenuLeft />, <ProjectDropDown />, <TaskList />],
    "/profile": [<MenuLeft />],
    "/projects": [<MenuLeft />],
    "/tasks": [<MenuLeft />, <ProjectDropDown />],
    "/adminpage": [<AdminNavigation />],
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
