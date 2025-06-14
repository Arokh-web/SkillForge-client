import { useState } from "react";
import fetchData from "../../API/fetchData";
import {
  useProjectContext,
  useTaskContextSingle,
} from "../../contexts/contexts";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CreateTaskorNote = () => {
  const location = useLocation();
  const isEditMode = location.pathname.includes("edit");
  const navigate = useNavigate();
  const { setTasks } = useTaskContextSingle();
  const { selectedProject } = useProjectContext();
  const [taskData, setTaskData] = useState(() => {
    return isEditMode && location.state?.taskToEdit
      ? location.state.taskToEdit
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

    if (isEditMode) {
      const {
        id,
        updatedAt,
        createdAt,
        completed_at,
        selected,
        ...updatedTaskData
      } = taskData;
      const res = await fetchData(
        "PUT",
        `/api/tasks/${taskData.id}`,
        updatedTaskData
      );
      console.log("Task updated:", res);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === res.id ? res : task))
      );
      navigate(`/tasks`);
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
      <h1 className="sub-title">
        {isEditMode ? (
          <>
            <span className="font-mono text-xl">Edit </span>
            <span>{taskData?.title}</span>
            <span className="font-mono text-xl"> for project </span>
            <span>{selectedProject?.title}</span>
          </>
        ) : (
          <span className="font-mono">Create a Task</span>
        )}
      </h1>

      {!isEditMode && (
        <p className="font-mono text-red-800">{selectedProject?.title}</p>
      )}

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
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="on hold">On Hold</option>
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
              value={taskData.deadline.slice(0, 10) || ""}
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
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
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
          {isEditMode ? "Edit " : "Create "}Task
        </button>
      </form>
    </div>
  );
};

export default CreateTaskorNote;
