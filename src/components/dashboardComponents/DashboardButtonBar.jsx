const DashboardButtonBar = () => {
  return (
    <div>
      {/* maybe with a dropdown, which kind of data to add? */}
      <select name="add-select">
        <option value="">Add</option>
        <option name="Project">Project</option>
        <option name="Task">Task</option>
        <option name="Note">Note</option>
      </select>
      <select name="edit-select">
        <option value="">Edit</option>
        <option name="Project">Project</option>
        <option name="Task">Task</option>
        <option name="Note">Note</option>
      </select>
      <select name="delete-select">
        <option value="">Delete</option>
        <option name="Project">Project</option>
        <option name="Task">Task</option>
        <option name="Note">Note</option>
      </select>
    </div>
  );
};

export default DashboardButtonBar;
