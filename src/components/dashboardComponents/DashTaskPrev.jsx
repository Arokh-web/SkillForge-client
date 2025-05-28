import { useTaskContextSingle } from "../../contexts/contexts";
import fetchData from "../../API/fetchData";
import React from "react";

const DashTaskPrev = () => {
  const { selectedTask, setSelectedTask } = useTaskContextSingle();

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
      setSelectedTask((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? { ...t, status: value } : t))
      );
    };
    changeTaskStatus(task);
  };

  return (
    <div className="dash-task-prev">
      <p className="sub-title ">Overview Selected Tasks:</p>
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>To be done until</th>
          </tr>
        </thead>

        <tbody>
          {selectedTask.length === 0 ? (
            <tr>
              <td colSpan="3">
                <div className="dash-task-item-list">
                  <div>No tasks selected</div>
                </div>
              </td>
            </tr>
          ) : (
            selectedTask.map((task) => (
              <React.Fragment key={task.id}>
                <tr key={`${task.id}-row}`} className="task-item">
                  <td colSpan="1">
                    <p className="text-sm font-medium">{task.title}</p>
                  </td>
                  <td></td>
                  <td colSpan="1">
                    <p className="text-xs">{task.deadline}</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="text-xs">{task.content}</p>
                  </td>
                  <td></td>
                </tr>

                <tr key={`${task.id}-radio}`} className="task-radiobuttons">
                  <td>
                    Done?
                    <input
                      type="radio"
                      name={`radio-${task.id}`}
                      defaultChecked={task.status === "done"}
                      className="checkbox"
                      value="done"
                      onChange={(e) =>
                        handleCheckboxChange(task, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    Active?
                    <input
                      type="radio"
                      name={`radio-${task.id}`}
                      defaultChecked={task.status === "active"}
                      className="checkbox"
                      value="active"
                      onChange={(e) =>
                        handleCheckboxChange(task, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    Planned?
                    <input
                      type="radio"
                      name={`radio-${task.id}`}
                      defaultChecked={task.status === "planned"}
                      className="checkbox"
                      value="planned"
                      onChange={(e) =>
                        handleCheckboxChange(task, e.target.value)
                      }
                    />
                  </td>
                </tr>
                {/* <button name="open-notes btn-primary">
                      Open connetected notes
                    </button> */}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashTaskPrev;
