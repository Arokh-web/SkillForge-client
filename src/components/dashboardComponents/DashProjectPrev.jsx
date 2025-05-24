import { useContext } from "react";
import { ProjectContext, TaskContext } from "../../contexts/contexts";

const DashProjectPrev = () => {
  const selectedProject = useContext(ProjectContext);

  return (
    <div>
      <p>Project Overview</p>
      {selectedProject.name && (
        <div>
          <h2>{selectedProject.name}</h2>
          <p>{selectedProject.description}</p>
          <p>
            Start Date:{" "}
            {new Date(selectedProject.startDate).toLocaleDateString()}
          </p>
          <p>
            End Date: {new Date(selectedProject.endDate).toLocaleDateString()}
          </p>
          <p>Status: {selectedProject.status}</p>
          <p>Tasks: {selectedProject.tasks.length}</p>
        </div>
      )}
    </div>
  );
};

export default DashProjectPrev;
