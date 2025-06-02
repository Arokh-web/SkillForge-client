// Import of styles
import "./styles/App.css";
import "./styles/Home.css";
import "./styles/dashboard.css";
import "./styles/projectAndTaskList.css";

// Import of pages (displayed in hero.jsx)
import Projects from "./pages/Projects.jsx";
import Tasks from "./pages/Tasks.jsx";
import Notes from "./pages/Notes.jsx";
import CreateProject from "./pages/CreateProject.jsx";
import TaskDetail from "./components/heroComponents/TaskDetail.jsx";
import NoteDetail from "./components/heroComponents/NoteDetail.jsx";
import ProjectDetail from "./components/heroComponents/ProjectDetail.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SignInUp from "./components/heroComponents/SignInUp.jsx";

// Import of components
import Home from "./pages/Home.jsx";

// Import of modules
import { Route, Routes } from "react-router-dom";

// Import of Contexts
import { ProjectProvider, TaskProviderSingle } from "./contexts/contexts";

function App() {
  return (
    <div>
      <ProjectProvider>
        <TaskProviderSingle>
          <Routes>
            <Route path="/" element={<Home />}>
              {/* <Route index element={<Hero />} /> */}
              <Route path="welcome" element={<SignInUp />} />
              <Route path="dashboard" element={<Dashboard />} />
              {/* SHOWS: The PROJECTS page shows ALL the projects of the user. 
          POSSIBILITY: The user can add projects here. 
          WHERE: It is displayed within the hero-component with the sidebar */}
              <Route path="projects" element={<Projects />} />
              <Route path="projects/new" element={<CreateProject />} />
              <Route path="projects/:projectId" element={<ProjectDetail />} />
              {/* The task-id-component shows the edittable details of one task. adding notes is possible here. */}

              {/* SHOWS: The TASKS and NOTES page shows ALL the tasks and notes of the user. 
          POSSIBILITY: The user can add tasks and notes here. 
          WHERE: It is displayed within the hero-component with the sidebar */}
              <Route path="tasks" element={<Tasks />} />
              <Route path="tasks/:taskId" element={<TaskDetail />} />
              <Route path="notes/:noteId" element={<NoteDetail />} />
              {/* The task-id-component shows the edittable details of one task. adding tasks is possible here. */}
              {/* The note-id-component  shows the edittable details of one note. connecting tasks is possible here. */}
            </Route>
          </Routes>
        </TaskProviderSingle>
      </ProjectProvider>
    </div>
  );
}

export default App;
