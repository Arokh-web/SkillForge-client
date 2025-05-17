// Import of styles
import "./App.css";

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

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
