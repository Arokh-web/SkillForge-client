import { useState, useEffect, createContext, useContext } from "react";
import fetchData from "../API/fetchData";

// CONTEXT DEFINITION
const TaskContextAll = createContext(null);
const TaskContextSingle = createContext(null);
const ProjectContext = createContext(null);
const NoteContextAll = createContext(null);
const AuthContext = createContext(null);

// CREATE CUSTOM HOOKS - useNAME gets the value of the specified context to be of that context, but selfmade (own name)
export const useProjectContext = () => useContext(ProjectContext);
export const useTaskContextAll = () => useContext(TaskContextAll);
export const useTaskContextSingle = () => useContext(TaskContextSingle);
export const useNoteContextAll = () => useContext(NoteContextAll);
export const useAuthContext = () => useContext(AuthContext);

// GET PROJECT DATA
// These function create the providers, formerly used as ProjectContext.Provider in App.jsx;
// It's possible to even concentrate ALL providers in one single "PROVIDER", but at first it will be separated for clarity.
export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      const rawProjects = await fetchData("GET", "/api/projects");
      const projects = rawProjects.map((project) => ({
        ...project,
        selected: false,
      }));
      setProjects(projects);

      setLoading(false);
    };
    getProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
        selectedProject,
        setSelectedProject,
        loading,
        setLoading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

// GET TASKS; ALL
// export const TaskProviderAll = ({ children }) => {
//   const [allTasks, setAllTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getTasks = async () => {
//       setLoading(true);
//       const data = await fetchData("GET", "/api/tasks");
//       console.log(data);
//       setAllTasks(data);
//       setLoading(false);
//     };
//     getTasks();
//   }, []);

//   return (
//     <TaskContextAll.Provider
//       value={{ allTasks, setAllTasks, loading, setLoading }}
//     >
//       {children}
//     </TaskContextAll.Provider>
//   );
// };

// GET TASKS; per project
export const TaskProviderSingle = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [taskCount, setTaskCount] = useState({});
  const [loading, setLoading] = useState(true);
  const { selectedProject } = useProjectContext();

  useEffect(() => {
    const getTasks = async () => {
      if (!selectedProject?.id) {
        console.log("No project selected, skipping task fetch.");
        return;
      }
      setLoading(true);
      const rawTasks = await fetchData(
        "GET",
        "/api/tasks/projects/" + selectedProject.id
      );
      const tasks = rawTasks.map((task) => ({
        ...task,
        selected: false, // Initialize selected state for each task; not in the API!
      }));

      setTasks(tasks);

      setTaskCount((prev) => ({
        ...prev,
        [selectedProject.id]: tasks.length,
      }));

      setLoading(false);
      console.log("Count of corresponding tasks:", tasks.length);
    };

    getTasks(selectedProject.id);
  }, [selectedProject]);

  return (
    <TaskContextSingle.Provider
      value={{
        tasks,
        setTasks,
        setSelectedTask,
        selectedTask,
        taskCount,
        setTaskCount,
        loading,
        setLoading,
      }}
    >
      {children}
    </TaskContextSingle.Provider>
  );
};

export const NoteProviderAll = ({ children }) => {
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);
      const data = await fetchData("GET", "/api/notes");
      console.log(data);
      setAllNotes(data);
      setLoading(false);
    };
    getNotes();
  }, []);

  return (
    <NoteContextAll.Provider
      value={{ allNotes, setAllNotes, loading, setLoading }}
    >
      {children}
    </NoteContextAll.Provider>
  );
};

export const changePinnedStatus = (task, value) => {
  const changeTaskPinned = async (task) => {
    console.log(
      "Sending PATCH request for task:",
      task.id,
      "with value:",
      value
    );
    await fetchData("PATCH", "/api/tasks/" + task.id, { pinned: value });
  };
  changeTaskPinned(task);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await fetchData("GET", `/auth/me/`);
        console.log("Fetched user data!");
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
