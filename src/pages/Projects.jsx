// This is the main page for the Projects section of the application
import { useEffect, useState } from "react";
import fetchData from "../API/fetchData";

const Projects = () => {
  // setting necessary States
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetching data from the API: PROJECTS
  // Explanation: useEffect is triggered on site-load. it shows loading = true as long as the await-function is not finished
  // and then sets the data to the projects-state. The loading state is set to false when the data is fetched.
  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      const data = await fetchData("GET", "/api/projects");
      console.log(data);
      setProjects(data);
      setLoading(false);
    };
    // the function getProjects is called when the component is called first time
    getProjects();
  }, []);

  return (
    <div>
      <h2>Featured Projects</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {projects.map((project) => (
            <div key={project.id}>
              <h2>{project.title}</h2>
              <p>{project.content}</p>
              <p>Status: {project.status}</p>
              <p>Created by: {project.user_id}</p>
              <p>Priority: {project.priority}</p>
              <p>Last update: {project.updatedAt}</p>
              <p>To be finished from: {project.deadline}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
