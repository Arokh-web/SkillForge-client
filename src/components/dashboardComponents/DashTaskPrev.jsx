import { TaskContext, ProjectContext } from "../../contexts/contexts";
import { useContext } from "react";
import fetchData from "../../API/fetchData";
import { use } from "react";
import React from "react";

const DashTaskPrev = () => {
  const { selectedTask } = useContext(TaskContext);
  const { selectedProject } = useContext(ProjectContext);

  console.log("Selected Tasks:", selectedTask);

  const handleCheckboxChange = (task, value) => {
    const changeTaskStatus = async (task) => {
      let newStatus;
      switch (value) {
        case "done":
          newStatus = "done";
          break;
        case "active":
          newStatus = "active";
          break;
        case "planned":
          newStatus = "planned";
          break;
        default:
          newStatus = task.status;
          break;
      }
      await fetchData("PATCH", "/api/tasks/" + task.id, { status: newStatus });
    };
    changeTaskStatus(task);
  };

  // console.log(`Status for task "${task.title}" changed to ${task.status}`);
  return (
    <>
      <div className="dash-task-prev">
        <p className="sub-title ">Overview Selected Tasks:</p>

        {selectedTask.length === 0 ? (
          <div className="dash-task-item-list">
            <div>No tasks selected</div>
          </div>
        ) : (
          <table className="">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
                <th>To be done until</th>
              </tr>
            </thead>
            <tbody>
              {/* 
              // priority: Joi.string().max(25).default("normal"),
              // pinned: Joi.boolean().default(false), */}

              {selectedTask.flatMap((task) => [
                <>
                  <tr key={task.id} className="task-item">
                    <td>
                      <p className="text-sm font-medium">{task.title}</p>
                    </td>
                    <td>
                      <p className="text-xs">{task.content}</p>
                    </td>
                    <td>
                      <p className="text-xs">{task.deadline}</p>
                    </td>
                  </tr>
                  ,
                  <tr key={task.id} className="task-radiobuttons">
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
                </>,
              ])}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default DashTaskPrev;
