import { Link } from "react-router-dom";

const MenuLeft = () => {
  return (
    <div className="side-menu-buttons-container">
      <p>
        <Link to="projects">
          <button className="menu-button">Show Projects</button>
        </Link>
      </p>
      <p>
        <Link to="projects/new">
          <button className="menu-button">Create new Project</button>
        </Link>
      </p>
      <p>
        <Link to="tasks">
          <button className="menu-button">Show Tasks</button>
        </Link>
      </p>
      <p>
        <Link to="tasks/new">
          <button className="menu-button">Create new Task</button>
        </Link>
      </p>
    </div>
  );
};

export default MenuLeft;
