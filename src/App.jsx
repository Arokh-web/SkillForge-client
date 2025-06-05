// Import of styles
import "./styles/App.css";
import "./styles/Home.css";
import "./styles/dashboard.css";
import "./styles/projectAndTaskList.css";

// Import of pages (displayed in hero.jsx)
import Projects from "./components/TaskAndProjectList/Projects.jsx";
import Tasks from "./components/TaskAndProjectList/Tasks.jsx";
import Notes from "./components/TaskAndProjectList/Notes.jsx";
import CreateProject from "./components/TaskAndProjectList/CreateProject.jsx";
import Dashboard from "./components/dashboardComponents/Dashboard.jsx";
import SignInUp from "./components/heroComponents/SignInUp.jsx";
import ProjectDetail from "./components/TaskAndProjectList/ProjectDetail.jsx";
import TaskDetail from "./components/TaskAndProjectList/TaskDetail.jsx";
import NoteDetail from "./components/TaskAndProjectList/NoteDetail.jsx";

// Import of components
import Home from "./pages/Home.jsx";

// Import of modules
import { Route, Routes } from "react-router-dom";

// Import of Contexts
import { ProjectProvider, TaskProviderSingle } from "./contexts/contexts";
import CreateTaskorNote from "./components/TaskAndProjectList/CreateTaskorNote.jsx";

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
              <Route path="tasks/new" element={<CreateTaskorNote />} />
              <Route path="notes" element={<Notes />} />
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
