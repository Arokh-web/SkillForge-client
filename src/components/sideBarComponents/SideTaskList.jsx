// this is the task-list on the left, dependend on the selected project from the project-dropdown; it exists in the left side bar

import { useEffect, useState } from "react";
import { useTaskContextSingle } from "../../contexts/contexts";

const TaskList = () => {
  const { tasks, setTasks, setSelectedTask, selectedTask } =
    useTaskContextSingle();

  const [selectedCount, setSelectedCount] = useState();

  const handleSelect = (id) => {
    // instead of setting tasks, there is a function that sets the tasks depending on the previous state
    setTasks((prev) => {
      // checks how many tasks are selected (a boolean as been added to the task-object)
      // const selectedCount = prev.filter((task) => task.selected).length;
      const selectedCount = prev.filter((task) => task.selected).length;
      // the long return-statement checks if the task is already selected or not
      // if it is selected, it will be unselected
      return prev.map((task) => {
        if (task.id !== id) return task;
        // if the task is selected (=true), return it as unselected (=false)
        if (task.selected) {
          return { ...task, selected: false };
          // if the task is not selected (=false), check how many tasks are selected
        } else if (selectedCount < 6) {
          return { ...task, selected: true };
        } else {
          // if the task is not selected (=false) and 3 tasks are already selected, return it as unselected

          return task;
        }
      });
    });
  };

  useEffect(() => {
    // This is where you can set the return message based on the selected tasks
    const selected = tasks.filter((task) => task.selected);
    setSelectedCount(selected.length);
    setSelectedTask(selected);
  }, [tasks]);

  if (!tasks) return <div>Loading tasks...</div>;

  const choosePointcolor = {
    active: "🟡",
    planned: "🔵",
    done: "🟢",
  };

  return (
    <div className="task-list-container">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-item ${task.selected ? "selected-task" : ""}`}
          onClick={() => handleSelect(task.id)}
        >
          <p>
            U-ID {task.id}: {choosePointcolor[task?.status]}
            {task.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
