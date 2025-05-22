const DashboardButtonBar = () => {
  return (
    <div>
      {/* maybe with a dropdown, which kind of data to add? */}
      <select name="add-select">
        Add<option name="Project">Project</option>
        <option name="Task">Task</option>
        <option name="Note">Note</option>
      </select>
      <select name="edit-select">
        Edit<option name="Project">Project</option>
        <option name="Task">Task</option>
        <option name="Note">Note</option>
      </select>
      <select name="delete-select">
        Delete<option name="Project">Project</option>
        <option name="Task">Task</option>
        <option name="Note">Note</option>
      </select>
      {/* <button></button>
      <button></button>
      <button></button> */}
    </div>
  );
};

export default DashboardButtonBar;
