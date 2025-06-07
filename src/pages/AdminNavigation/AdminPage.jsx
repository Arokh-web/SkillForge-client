import { useState } from "react";
import AdminUsers from "./AdminUsers";
import AdminProjects from "./AdminProjects";
import AdminTasks from "./AdminTasks";

const AdminPage = () => {
  const [view, setView] = useState("users");

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">
        THIS IS THE AdminPage. IF YOU ARE NO SUPERHERO, GET AWAY.
      </h1>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setView("users")}>Users</button>
        <button onClick={() => setView("projects")}>Projects</button>
        <button onClick={() => setView("tasks")}>Tasks</button>
      </div>

      {view === "users" && <AdminUsers />}
      {view === "projects" && <AdminProjects />}
      {view === "tasks" && <AdminTasks />}
    </div>
  );
};

export default AdminPage;
