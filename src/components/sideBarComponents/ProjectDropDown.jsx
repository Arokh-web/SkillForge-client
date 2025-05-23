// this is the project-dropdown component it only displays the projects of the signed-in user
import { useEffect, useState } from "react";
import fetchData from "../../API/fetchData";
import { useContext } from "react";
import { TaskContext, ProjectContext } from "../../contexts/contexts";

const ProjectDropDown = () => {
  // setting necessary LOCAL states
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState("");
  // setting contexts
  const { projects, setProjects } = useContext(ProjectContext);
  const { tasks, setTasks } = useContext(TaskContext);

  // fetching data from the API: PROJECTS
  // Explanation: useEffect is triggered on site-load. it shows loading = true as long as the await-function is not finished
  // and then sets the data to the projects-state. The loading state is set to false when the data is fetched.
  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      const rawProjects = await fetchData("GET", "/api/projects");
      const projects = rawProjects.map((project) => ({
        ...project,
        selected: false, // Initialize selected state for each project; not in the API!
      }));
      setProjects(projects);
      setLoading(false);
    };
    getProjects();
  }, []);

  useEffect(() => {
    const getTasks = async () => {
      if (selectedProject) {
        setLoading(true);
        const rawTasks = await fetchData(
          "GET",
          "/api/tasks/projects/" + selectedProject
        );
        const tasks = rawTasks.map((task) => ({
          ...task,
          selected: false, // Initialize selected state for each task; not in the API!
        }));

        setTasks(tasks);
        setLoading(false);
        console.log(tasks);
      }
    };

    getTasks();
  }, [selectedProject]);

  const handleChange = (event) => {
    setSelectedProject(event.target.value);
  };

  return (
    <div className="project-dropdown-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <select
            value={selectedProject}
            onChange={handleChange}
            className="project-select"
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default ProjectDropDown;
