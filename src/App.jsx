// Import of styles
import "./styles/App.css";
import "./styles/Home.css";

// Import of pages (displayed in hero.jsx)
import Projects from "./pages/Projects.jsx";
import Tasks from "./pages/Tasks.jsx";
import Notes from "./pages/Notes.jsx";
import CreateProject from "./pages/CreateProject.jsx";
import TaskDetail from "./components/TaskDetail.jsx";
import NoteDetail from "./components/NoteDetail.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// Import of components
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";

// Import of modules
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

// Import of Contexts
import { ProjectContext, TaskContext } from "./contexts/contexts.js";

function App() {
  // Setting of main states
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div>
      <ProjectContext.Provider value={{ projects, setProjects }}>
        <TaskContext.Provider value={{ tasks, setTasks }}>
          <Home />
          <Routes>
            <Route>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* SHOWS: The PROJECTS page shows ALL the projects of the user. 
          POSSIBILITY: The user can add projects here. 
          WHERE: It is displayed within the hero-component with the sidebar */}
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/new" element={<CreateProject />} />
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
              {/* The task-id-component shows the edittable details of one task. adding notes is possible here. */}

              {/* SHOWS: The TASKS and NOTES page shows ALL the tasks and notes of the user. 
          POSSIBILITY: The user can add tasks and notes here. 
          WHERE: It is displayed within the hero-component with the sidebar */}
              <Route path="/tasks-and-notes" element={<Tasks />} />
              <Route path="/tasks/:taskId" element={<TaskDetail />} />
              <Route path="/notes/:noteId" element={<NoteDetail />} />
              {/* The task-id-component shows the edittable details of one task. adding tasks is possible here. */}
              {/* The note-id-component  shows the edittable details of one note. connecting tasks is possible here. */}
            </Route>
          </Routes>
        </TaskContext.Provider>
      </ProjectContext.Provider>
    </div>
  );
}

export default App;
