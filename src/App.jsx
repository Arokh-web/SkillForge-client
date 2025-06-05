// Import of styles
import "./styles/App.css";
import "./styles/Home.css";
import "./styles/dashboard.css";
import "./styles/projectAndTaskList.css";

// Import of components (displayed in hero.jsx)
// DATA lists:
import Projects from "./components/TaskAndProjectList/Projects.jsx";
import Tasks from "./components/TaskAndProjectList/Tasks.jsx";
import Notes from "./components/TaskAndProjectList/Notes.jsx";
// CREATION components:
import CreateProject from "./components/TaskAndProjectList/CreateProject.jsx";
import CreateTaskorNote from "./components/TaskAndProjectList/CreateTaskorNote.jsx";
// DISPLAY components:
import Dashboard from "./components/dashboardComponents/Dashboard.jsx";
import ProjectDetail from "./components/TaskAndProjectList/ProjectDetail.jsx";
import TaskDetail from "./components/TaskAndProjectList/TaskDetail.jsx";
import NoteDetail from "./components/TaskAndProjectList/NoteDetail.jsx";

// Import of COMPOSITION components
import Home from "./pages/Home.jsx"; // Home is the main page of the app, which contains the hero-component with the sidebar and header/footer

// Import of modules and signin/signout components
import { Route, Routes } from "react-router-dom";
import {
  UserProtectedRoute,
  AdminProtectedRoute,
} from "./components/SignComponents/ProtectedRoute.jsx";
import AdminPage from "./pages/AdminPage.jsx";

// Import of Contexts
import {
  ProjectProvider,
  TaskProviderSingle,
  AuthProvider,
} from "./contexts/contexts";
import SignInUp from "./components/SignComponents/SignInUp.jsx";

function App() {
  return (
    <div>
      <AuthProvider>
        <ProjectProvider>
          <TaskProviderSingle>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="signinup" element={<SignInUp />} />
                {/* USER: PROTECTED AREA STARTS HERE */}
                <Route element={<UserProtectedRoute />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  {/* SHOWS: The PROJECTS page shows ALL the projects of the user. 
          POSSIBILITY: The user can add projects here. 
          WHERE: It is displayed within the hero-component with the sidebar */}
                  <Route path="projects" element={<Projects />} />
                  <Route path="projects/new" element={<CreateProject />} />
                  <Route
                    path="projects/:projectId"
                    element={<ProjectDetail />}
                  />
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
                {/* USER: PROTECTED AREA ENDS HERE */}
                {/* ADMIN: PROTECTED AREA STARTS HERE */}
                <Route element={<AdminProtectedRoute />}>
                  <Route path="adminpage" element={<AdminPage />} />
                </Route>
              </Route>
            </Routes>
          </TaskProviderSingle>
        </ProjectProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
