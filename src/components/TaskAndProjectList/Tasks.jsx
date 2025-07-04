// This is the main page for the Tasks section of the application
import React from "react";
import { useTaskContextSingle } from "../../contexts/contexts.jsx";
import { useState } from "react";
import { changePinnedStatus } from "../../contexts/contexts.jsx";
import fetchData from "../../API/fetchData.js";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const { setTasks, tasks, loading } = useTaskContextSingle();
  const [expandedDesc, setExpandedDesc] = useState({});
  const navigate = useNavigate();

  const toggleDescExpand = (id) => {
    setExpandedDesc((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePinned = (task, value) => {
    changePinnedStatus(task, value);

    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? { ...t, pinned: value } : t))
    );
  };

  const handleClickDelete = async (id) => {
    try {
      const response = await fetchData("DELETE", "/api/tasks/" + id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      console.log("Task deleted:", response);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleClickEdit = (task) => {
    navigate(`/tasks/${task.id}/edit`, {
      state: { taskToEdit: task },
    });
  };

  return (
    <div>
      {loading ? (
        <p>Choose a project on the left to view its tasks.</p>
      ) : (
        <div className="tasks-container">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <React.Fragment key={task.id}>
                <div
                  className={`t-card ${
                    task.priority === "none"
                      ? "bg-gray-200"
                      : task.priority === "high"
                      ? "bg-red-100"
                      : task.priority === "medium"
                      ? "bg-yellow-100"
                      : task.priority === "low"
                      ? "bg-green-100"
                      : "bg-[var(--color-selectedTaskBg)]"
                  }`}
                  key={task.id}
                >
                  <h2 className="text-xl flex-col gap-5 items-center">
                    <div>
                      {task.pinned && <span className="t-pin">📌</span>}
                    </div>
                    {task.title}

                    <div
                      className={`${
                        task.status === "active"
                          ? "text-green-500"
                          : task.status === "planned"
                          ? "text-yellow-600"
                          : task.status === "done"
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      <p> {task.status}</p>
                    </div>
                  </h2>

                  <div className="t-card-body">
                    {/* START OF DESCRIPTION */}
                    <div
                      className={`t-desc-container mt-4 ${
                        expandedDesc[task.id] ? "expanded" : "collapsed"
                      }`}
                    >
                      <p className="t-description">{task.content}</p>
                    </div>

                    {/* START OF INFORMATION */}
                    <div className="t-info-meta-container mt-4 mb-4">
                      <div className="t-info-container gap-1">
                        <p className="t-data-title">Priority: </p>
                        <p
                          className={`${
                            task.status === "done"
                              ? "text-gray-500 font-bold"
                              : task.priority === "low"
                              ? "text-green-400 font-bold"
                              : task.priority === "medium"
                              ? "text-yellow-600 font-bold"
                              : task.priority === "high"
                              ? "text-red-600 font-bold"
                              : "text-gray-500 font-bold"
                          }`}
                        >
                          {task.status === "done" ? "none" : task.priority}
                        </p>
                      </div>

                      <div className="t-meta-container justify-between">
                        <p className="t-data-title">Deadline: </p>
                        <p>{task.deadline.slice(0, 10) || ""}</p>

                        <p className="t-data-title">Created at: </p>
                        <p>{task.createdAt}</p>
                        {task.completed_at && (
                          <>
                            <p className="t-data-title">Completed on: </p>
                            <p>{task.completed_at}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    className="t-pin-button"
                    onClick={() => handlePinned(task, !task.pinned)}
                  >
                    {task.pinned ? "Unpin!" : "Pin!"}
                  </button>
                  <div className="t-buttons-container">
                    <div className="flex gap-4">
                      <button
                        name={`t-toggle-btn-${task.id}`}
                        className="p-button"
                        onClick={() => toggleDescExpand(task.id)}
                      >
                        {expandedDesc[task.id] ? "Hide" : "Full"}
                      </button>

                      <button
                        className="p-button"
                        onClick={() => handleClickEdit(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="p-button"
                        onClick={() => handleClickDelete(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                {/* START of button container */}
              </React.Fragment>
            ))
          ) : (
            <p>No tasks available for the selected project.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
