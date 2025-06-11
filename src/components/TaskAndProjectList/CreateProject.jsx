import React from "react";
import fetchData from "../../API/fetchData";
import { data, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useProjectContext } from "../../contexts/contexts";
import { useLocation } from "react-router-dom";

const CreateProject = () => {
  const location = useLocation();
  const isEditMode = location.pathname.includes("edit");
  const { setProjects } = useProjectContext();
  const [projectData, setProjectData] = useState(() => {
    return isEditMode && location.state?.projectToEdit
      ? location.state.projectToEdit
      : {
          title: "",
          content: "",
          status: "",
          deadline: "",
          priority: "",
          pinned: false,
        };
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectData.title || !projectData.content || !projectData.status) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setErrorMessage("");

    // UPDATE PROJECT
    if (isEditMode) {
      console.log("Updating project:", projectData);
      const { id, user_id, createdAt, updatedAt, ...dataToUpdate } =
        projectData;
      const response = await fetchData(
        "PATCH",
        "/api/projects/" + id,
        dataToUpdate
      );
      console.log("Project updated:", response);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === response.id ? response : project
        )
      );
      navigate("/projects");

      return;
    } else {
      // CREATE PROJECT
      const response = await fetchData("POST", "/api/projects", projectData);
      console.log("Project created:", response);
      navigate("/projects");
      setProjectData({
        title: "",
        content: "",
        status: "",
        deadline: "",
        priority: "",
        pinned: false,
      });
      setProjects((prevProjects) => [...prevProjects, response]);
    }
  };

  console.log("Project data:", projectData);
  console.log("Is edit mode:", isEditMode);

  return (
    <div>
      <h1 className={isEditMode ? "title text-red-900" : "title"}>
        {isEditMode ? `Edit ${projectData.title}` : "Create a Project"}
      </h1>
      <form onSubmit={handleSubmit} className="create-project-container">
        <div className="field">
          <label className="form-tag">Title</label>
          <div className="control">
            <input
              className="input creation-input"
              type="text"
              name="title"
              value={projectData.title}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="form-tag">Content</label>
          <div className="control">
            <textarea
              className="content-textarea"
              name="content"
              value={projectData.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        <div className="field">
          <label className="form-tag">Status</label>
          <div className="control">
            <select
              className="select"
              type="text"
              name="status"
              value={projectData.status}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Planning">Planning</option>
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label className="form-tag">Deadline</label>
          <div className="control">
            <input
              className="input creation-input"
              type="date"
              name="deadline"
              value={projectData.deadline}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="form-tag">Priority</label>
          <div className="control">
            <select
              className="select"
              type="text"
              name="priority"
              value={projectData.priority}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Priority
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="flex">
          <label className="form-tag flex align-center gap-3">
            <input
              type="checkbox"
              name="pinned"
              checked={projectData.pinned}
              onChange={(e) =>
                setProjectData({ ...projectData, pinned: e.target.checked })
              }
            />
            Shall this one be pinned?
          </label>
        </div>
        {errorMessage && <span className="text-red-700">{errorMessage}</span>}
        <button type="submit" className="sign-button">
          {isEditMode ? "Update Project" : "Create Project"}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
