import { useState } from "react";
import AdminUsers from "./AdminUsers";
import AdminProjects from "./AdminProjects";
import AdminTasks from "./AdminTasks";
import { useEffect } from "react";
import fetchData from "../../API/fetchData";

const AdminPage = () => {
  const [view, setView] = useState("users");

  const [users, setUsers] = useState();
  const [usersProjects, setUsersProjects] = useState();
  const [usersTasks, setUsersTasks] = useState();

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await fetchData("GET", "/api/users/");
      const usersProjects = await fetchData("GET", "/api/projects/");
      const usersTasks = await fetchData("GET", "/api/tasks/");
      setUsers(usersData);
      setUsersProjects(usersProjects);
      setUsersTasks(usersTasks);
      console.log("Fetched users:", users);
      console.log("Fetched user projects:", usersProjects);
      console.log("Fetched user tasks:", usersTasks);
    };
    getUsers();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">
        THIS IS THE AdminPage. IF YOU ARE NO SUPERHERO, GET AWAY.
      </h1>

      <div className="flex gap-4 mb-6">
        <button className="p-button" onClick={() => setView("users")}>
          Users
        </button>
        <button className="p-button" onClick={() => setView("projects")}>
          Projects
        </button>
        <button className="p-button" onClick={() => setView("tasks")}>
          Tasks
        </button>
      </div>

      {view === "users" && (
        <AdminUsers users={users} usersProjects={usersProjects} />
      )}
      {view === "projects" && <AdminProjects projects={usersProjects} />}
      {view === "tasks" && <AdminTasks tasks={usersTasks} />}
    </div>
  );
};

export default AdminPage;
