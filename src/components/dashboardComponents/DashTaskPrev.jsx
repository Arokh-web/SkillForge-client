import { useTaskContextSingle } from "../../contexts/contexts";
import fetchData from "../../API/fetchData";
import React, { useState } from "react";

const DashTaskPrev = () => {
  const { selectedTask, setTasks } = useTaskContextSingle();
  const [expandedTaskIds, setExpandedTaskIds] = useState([]);

  console.log("Selected Tasks:", selectedTask);

  const handleCheckboxChange = (task, value) => {
    const changeTaskStatus = async (task) => {
      console.log(
        "Sending PATCH request for task:",
        task.id,
        "with value:",
        value
      );
      await fetchData("PATCH", "/api/tasks/" + task.id, { status: value });
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: value } : t))
      );
    };
    changeTaskStatus(task);
  };

  return (
    <div className="dash-task-preview">
      <p className="sub-title">Task Overview:</p>

      <div className="task-select-tableheader">
        <div className="task-select-row">
          <div className="w-1/3">Title</div>
          <div className="w-1/3">Deadline</div>
          <div className="w-1/3">Status</div>
        </div>
      </div>

      <div className="w-200 text-sm">
        {selectedTask.length === 0 ? (
          <div className="">No tasks selected</div>
        ) : (
          selectedTask.map((task) => (
            <React.Fragment key={task.id}>
              <div
                name={`task-${task.id}`}
                className="task-select-row"
                onClick={() => {
                  setExpandedTaskIds((prev) =>
                    prev.includes(task.id)
                      ? prev.filter((id) => id !== task.id)
                      : [...prev, task.id]
                  );
                }}
              >
                <div className="w-1/3">{task.title}</div>
                <div className="w-1/3">{task.deadline}</div>
                <div className="w-1/3" onClick={(e) => e.stopPropagation()}>
                  {/* prevents from click-expanding at this point*/}
                  <select
                    name={`status-${task.id}`}
                    defaultValue={task.status}
                    onChange={(e) => handleCheckboxChange(task, e.target.value)}
                  >
                    <option value="done">Done</option>
                    <option value="active">Active</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>
              </div>
              {expandedTaskIds.includes(task.id) && <div>{task.content}</div>}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default DashTaskPrev;
