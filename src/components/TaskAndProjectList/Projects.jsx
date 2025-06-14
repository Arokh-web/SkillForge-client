// This is the main page for the Projects section of the application
import { useProjectContext } from "../../contexts/contexts.jsx";
import { useState } from "react";
import { useTaskContextSingle } from "../../contexts/contexts.jsx";
import fetchData from "../../API/fetchData.js";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  // setting necessary States
  const navigate = useNavigate();
  const { setProjects, projects, loading, setSelectedProject } =
    useProjectContext();
  const { taskCount } = useTaskContextSingle();
  const [expandedDesc, setExpandedDesc] = useState({});
  const [expandedInfo, setExpandedInfo] = useState({});

  // saves the toggle-state for each project-card (per id)
  const toggleDescExpand = (id) => {
    setExpandedDesc((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleInfoExpand = (id) => {
    const updatedProjects = projects.map((project) => ({
      ...project,
      selected: project.id === id,
    }));

    const selected = updatedProjects.find((project) => project.id === id);

    setSelectedProject(selected);

    setExpandedInfo((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleClickEdit = (project) => {
    navigate(`/projects/${project.id}/edit`, {
      state: { projectToEdit: project },
    });
  };

  const handleClickDelete = async (id) => {
    try {
      const response = await fetchData("DELETE", "/api/projects/" + id);
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div>
      <h1 className="title">Featured Projects</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {projects.map((project) => (
            <div className="flex items-center" key={project.id}>
              <div className="p-card">
                <h2 className="sub-title flex gap-5">
                  {project.title}
                  <div
                    className={`font-mono text-xl ${
                      project.status === "active" || project.status === "Active"
                        ? "text-green-500"
                        : project.status === "planning" ||
                          project.status === "Planning"
                        ? "text-yellow-600"
                        : project.status === "done" || project.status === "Done"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {project.status}
                  </div>
                </h2>
                <div className="p-card-body">
                  {/* START OF DESCRIPTION */}
                  <div
                    className={`p-desc-container ${
                      expandedDesc[project.id] ? "expanded" : "collapsed"
                    }`}
                  >
                    <p className="p-description">{project.content}</p>
                  </div>

                  {/* START OF INFORMATION */}
                  <div
                    className={`p-info-meta-container ${
                      expandedInfo[project.id] ? "expanded" : "collapsed"
                    }`}
                  >
                    <div className="flex flex-wrap gap-10 justify-between text-sm mt-2">
                      <div className="flex flex-col gap-1 min-w-[120px]">
                        <div className="flex gap-2">
                          <p className="p-data-title">Priority:</p>
                          <p
                            className={`${
                              project.priority === "low" ||
                              project.priority === "Low"
                                ? "text-green-400 font-bold"
                                : project.priority === "medium" ||
                                  project.priority === "Medium"
                                ? "text-yellow-600 font-bold"
                                : project.priority === "high" ||
                                  project.priority === "High"
                                ? "text-red-600 font-bold"
                                : "text-gray-500 font-bold"
                            }`}
                          >
                            {project.priority}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <p className="p-data-title">Associated Tasks:</p>
                          <p>{taskCount[project.id] ?? "-"}</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 min-w-[180px]">
                        <div className="flex gap-2">
                          <p className="p-data-title">To be finished until:</p>
                          <p>{project.deadline}</p>
                        </div>
                        <div className="flex gap-2">
                          <p className="p-data-title">Last update:</p>
                          <p>{project.updatedAt}</p>
                        </div>
                        <div className="flex gap-2">
                          <p className="p-data-title">Date of Creation:</p>
                          <p>{project.createdAt}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* START of button container */}
                  <div className="p-buttons-container w-full">
                    <button
                      name={`p-toggle-btn-${project.id}`}
                      className={`p-button w-1/4`}
                      onClick={() => toggleDescExpand(project.id)}
                    >
                      {expandedDesc[project.id]
                        ? "Hide description"
                        : "Full description"}
                    </button>
                    <button
                      name={`p-info-toggle-btn-${project.id}`}
                      className={`p-button w-1/4`}
                      onClick={() => toggleInfoExpand(project.id)}
                    >
                      {expandedInfo[project.id] ? "Hide Info" : "Show Info"}
                    </button>

                    <button
                      className="p-button w-1/4"
                      onClick={() => handleClickEdit(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="p-button w-1/4"
                      onClick={(e) => handleClickDelete(project.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
