// This is the main page for the Projects section of the application
import { useProjectContext } from "../contexts/contexts.jsx";
import React, { useState } from "react";
import { useTaskContextSingle } from "../contexts/contexts.jsx";

const Projects = () => {
  // setting necessary States
  const { projects, loading, setSelectedProject } = useProjectContext();
  const { tasks, taskCount } = useTaskContextSingle();
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
                    className={`${
                      project.status === "active"
                        ? "text-green-500"
                        : project.status === "planning"
                        ? "text-yellow-600"
                        : project.status === "done"
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
                    <div className={"p-info-container"}>
                      <p className="p-data-title">Created by: </p>
                      <p>{project.user_id}</p>
                      <p className="p-data-title">Priority: </p>
                      <p
                        className={`${
                          project.priority === "low"
                            ? "text-green-400 font-bold"
                            : project.priority === "medium"
                            ? "text-yellow-600 font-bold"
                            : project.priority === "high"
                            ? "text-red-600 font-bold"
                            : "text-gray-500 font-bold"
                        }`}
                      >
                        {project.priority}
                      </p>
                      <p className="p-data-title">Associated Tasks: </p>
                      <p>{taskCount[project.id] ?? "-"}</p>
                    </div>

                    <div className="p-meta-container">
                      <p className="p-data-title">To be finished until: </p>
                      <p>{project.deadline}</p>
                      <p className="p-data-title">Last update: </p>
                      <p>{project.updatedAt}</p>
                      <p className="p-data-title">Date of Creation: </p>
                      <p>{project.createdAt}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-buttons-container itrems-center">
                <div className="flex items-center gap-5">
                  <button
                    name={`p-toggle-btn-${project.id}`}
                    className={`p-button`}
                    onClick={() => toggleDescExpand(project.id)}
                  >
                    {expandedDesc[project.id] ? "Hide Desc" : "Show Desc"}
                  </button>
                  <button
                    name={`p-info-toggle-btn-${project.id}`}
                    className={`p-button`}
                    onClick={() => toggleInfoExpand(project.id)}
                  >
                    {expandedInfo[project.id] ? "Hide Info" : "Show Info"}
                  </button>
                </div>
                <div className="flex items-center gap-5">
                  <button className="p-edit-button">Edit</button>
                  <button className="p-delete-button">Delete</button>
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
