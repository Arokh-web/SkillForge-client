import { useState, useEffect, createContext, useContext } from "react";
import fetchData from "../API/fetchData";

const TaskContextAll = createContext(null);
const TaskContextSingle = createContext(null);
const ProjectContext = createContext(null);
const NoteContextAll = createContext(null);

export const useProjectContext = () => useContext(ProjectContext);
export const useTaskContextAll = () => useContext(TaskContextAll);
export const useTaskContextSingle = () => useContext(TaskContextSingle);
export const useNoteContextAll = () => useContext(NoteContextAll);

// GET DATA CONTEXTS
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
export const TaskProviderAll = ({ children }) => {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);
      const data = await fetchData("GET", "/api/tasks");
      console.log(data);
      setAllTasks(data);
      setLoading(false);
    };
    getTasks();
  }, []);

  return (
    <TaskContextAll.Provider
      value={{ allTasks, setAllTasks, loading, setLoading }}
    >
      {children}
    </TaskContextAll.Provider>
  );
};

// GET TASKS; per project
export const TaskProviderSingle = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedProject } = useProjectContext();

  useEffect(() => {
    const getTasks = async () => {
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
      setLoading(false);
      console.log("Count of corresponding tasks:", tasks.length);
    };
    if (selectedProject?.id) {
      getTasks(selectedProject.id);
    }
  }, [selectedProject]);

  return (
    <TaskContextSingle.Provider
      value={{
        tasks,
        setTasks,
        setSelectedTask,
        selectedTask,
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
