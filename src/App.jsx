// Import of styles
import "./styles/App.css";
import "./styles/Home.css";

// Import of pages (displayed in hero.jsx)
import Projects from "./pages/Projects.jsx";
import Tasks from "./pages/Tasks.jsx";
import Notes from "./pages/Notes.jsx";

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
          <Header />
          <Routes>
            <Route>
              <Route path="/" element={<Home />} />
              {/* SHOWS: The PROJECTS page shows ALL the projects of the user. 
          POSSIBILITY: The user can add projects here. 
          WHERE: It is displayed within the hero-component with the sidebar */}
              <Route path="/projects" element={<Projects />} />
              {/* The task-id-component shows the edittable details of one task. adding notes is possible here. */}
              {/* <Route path="/projects/:projectId" element={<ProjectDetail />} /> */}

              {/* SHOWS: The TASKS page shows ALL the tasks of the user with the corresponding project-name. 
          POSSIBILITY: The user can add tasks here. 
          WHERE: It is displayed within the hero-component with the sidebar */}
              <Route path="/tasks" element={<Tasks />} />
              {/* The task-id-component shows the edittable details of one task. adding notes is possible here. */}
              {/* <Route path="/tasks/:taskId" element={<TaskDetail />} /> */}

              {/* SHOWS: The NOTES page shows ALL the notes of the user with the TASKS and PROJECTS connected to it.
          POSSIBILITY: The user can ass notes here.
          WHERE: It is displayed within the hero-component with the sidebar */}
              <Route path="/notes" element={<Notes />} />
              {/* The note-id-component  shows the edittable details of one note. connecting tasks is possible here. */}
              {/* <Route path="/notes/:noteId" element={<NoteDetail />} /> */}
            </Route>
          </Routes>
          <Footer />
        </TaskContext.Provider>
      </ProjectContext.Provider>
    </div>
  );
}

export default App;
