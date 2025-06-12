// Import of styles
import "./styles/App.css";
import "./styles/Home.css";
import "./components/dashboardComponents/dashboard.css";
import "./components/TaskAndProjectList/projectAndTaskList.css";
import "./components/TaskAndProjectList/creation.css";

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
import AdminPage from "./pages/AdminNavigation/AdminPage.jsx";

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
                <Route index element={<SignInUp />} />

                <Route path="signinup" element={<SignInUp />} />
                {/* USER: PROTECTED AREA STARTS HERE */}

                <Route
                  path="dashboard"
                  element={
                    <UserProtectedRoute>
                      <Dashboard />
                    </UserProtectedRoute>
                  }
                />
                {/* SHOWS: The PROJECTS page shows ALL the projects of the user. 
          POSSIBILITY: The user can add projects here. 
          WHERE: It is displayed within the hero-component with the sidebar */}
                <Route
                  path="projects"
                  element={
                    <UserProtectedRoute>
                      <Projects />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="projects/new"
                  element={
                    <UserProtectedRoute>
                      <CreateProject />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="projects/:projectId"
                  element={
                    <UserProtectedRoute>
                      <ProjectDetail />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="projects/:projectId/edit"
                  element={
                    <UserProtectedRoute>
                      <CreateProject />
                    </UserProtectedRoute>
                  }
                />
                {/* The task-id-component shows the edittable details of one task. adding notes is possible here. */}

                {/* SHOWS: The TASKS and NOTES page shows ALL the tasks and notes of the user. 
          POSSIBILITY: The user can add tasks and notes here. 
          WHERE: It is displayed within the hero-component with the sidebar */}
                <Route
                  path="tasks"
                  element={
                    <UserProtectedRoute>
                      <Tasks />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="tasks/:taskId"
                  element={
                    <UserProtectedRoute>
                      <TaskDetail />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="tasks/new"
                  element={
                    <UserProtectedRoute>
                      <CreateTaskorNote />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="tasks/:taskId/edit"
                  element={
                    <UserProtectedRoute>
                      <CreateTaskorNote />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="notes"
                  element={
                    <UserProtectedRoute>
                      <Notes />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="notes/:noteId"
                  element={
                    <UserProtectedRoute>
                      <NoteDetail />
                    </UserProtectedRoute>
                  }
                />
                {/* The task-id-component shows the edittable details of one task. adding tasks is possible here. */}
                {/* The note-id-component  shows the edittable details of one note. connecting tasks is possible here. */}

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
