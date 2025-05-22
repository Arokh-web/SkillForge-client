const SideMenu = () => {
  const handleProjectClick = () => {
    window.location.href = "/projects";
  };

  const handleTaskNoteClick = () => {
    window.location.href = "/tasks-and-notes";
  };

  const handleCreateProjectClick = () => {
    window.location.href = "/projects/new";
  };

  return (
    <div className="side-menu">
      Go to...
      <p>
        <button className="project-button" onClick={handleProjectClick}>
          Project-List
        </button>
      </p>
      <p>
        <button className="task-and-note-button" onClick={handleTaskNoteClick}>
          All Tasks and Notes
        </button>
      </p>
      <p>
        <button
          className="create-project-button"
          onClick={handleCreateProjectClick}
        >
          Create new Project
        </button>
      </p>
    </div>
  );
};

export default SideMenu;
