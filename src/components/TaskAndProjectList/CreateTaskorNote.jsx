import { useState } from "react";
import fetchData from "../../API/fetchData";
import {
  useProjectContext,
  useTaskContextSingle,
} from "../../contexts/contexts";
import { useNavigate } from "react-router-dom";

const CreateTaskorNote = () => {
  const navigate = useNavigate();
  const { tasks, setTasks } = useTaskContextSingle();
  const { setProjects, selectedProject } = useProjectContext();
  const [taskData, setTaskData] = useState({
    title: "",
    content: "",
    status: "",
    deadline: "",
    priority: "",
    pinned: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
      project_id: selectedProject.id, // Ensure the task is linked to the selected project
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !taskData.title ||
      !taskData.content ||
      !taskData.status ||
      selectedProject.id === undefined
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setErrorMessage("");

    const response = await fetchData("POST", "/api/tasks", taskData);
    console.log("Task created:", response);
    setTasks((prevTasks) => [...prevTasks, response]);
    setTaskData({
      title: "",
      content: "",
      status: "",
      deadline: "",
      priority: "",
      pinned: false,
    });
    navigate("/tasks");
  };

  return (
    <div>
      <h1 className="title">
        Create a Task for <br></br>
        <p className="text-red-800">{selectedProject.title}</p>
      </h1>
      <form onSubmit={handleSubmit} className="create-task-container">
        <div className="field">
          <label className="form-tag">Title</label>
          <div className="control">
            <input
              className="input creation-input"
              type="text"
              name="title"
              value={taskData.title}
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
              value={taskData.content}
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
              value={taskData.status}
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
              value={taskData.deadline}
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
              value={taskData.priority}
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
              checked={taskData.pinned}
              onChange={(e) =>
                setTaskData({ ...taskData, pinned: e.target.checked })
              }
            />
            Shall this one be pinned?
          </label>
        </div>
        {errorMessage && <span className="text-red-700">{errorMessage}</span>}
        <button type="submit" className="sign-button">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTaskorNote;
