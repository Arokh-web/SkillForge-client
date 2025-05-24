const DashMenuLeft = () => {
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
      <div className="side-menu-buttons">
        <p>
          <button className="dashmenu-button" onClick={handleProjectClick}>
            Project-List
          </button>
        </p>
        <p>
          <button className="dashmenu-button" onClick={handleTaskNoteClick}>
            All Tasks and Notes
          </button>
        </p>
        <p>
          <button
            className="dashmenu-button"
            onClick={handleCreateProjectClick}
          >
            Create new Project
          </button>
        </p>
      </div>
    </div>
  );
};

export default DashMenuLeft;
