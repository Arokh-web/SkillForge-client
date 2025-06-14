// this is the project-dropdown component it only displays the projects of the signed-in user
import {
  useTaskContextSingle,
  useProjectContext,
} from "../../contexts/contexts";

const ProjectDropDown = () => {
  // setting contexts
  const { projects, selectedProject, setSelectedProject, loading } =
    useProjectContext();
  const { setSelectedTask } = useTaskContextSingle();

  // fetching data from the API: PROJECTS
  // Explanation: useEffect is triggered on site-load. it shows loading = true as long as the await-function is not finished
  // and then sets the data to the projects-state. The loading state is set to false when the data is fetched.

  const handleChange = (event) => {
    const selectId = parseInt(event.target.value, 10);
    const updatedProjects = projects.map((project) => ({
      ...project,
      selected: project.id === selectId,
    }));

    const selected = updatedProjects.find((project) => project.id === selectId);

    setSelectedProject(selected);
    setSelectedTask("");
    console.log("Selected project:", selected?.title);
  };

  return (
    <div className="project-dropdown-container">
      {loading ? (
        <p>Create a project first!</p>
      ) : (
        <div>
          <select
            value={selectedProject?.id ?? ""}
            onChange={handleChange}
            className="project-select"
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project?.id} value={project.id}>
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
