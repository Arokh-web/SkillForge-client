import { useProjectContext } from "../../contexts/contexts";

const DashProjectPrev = () => {
  const { selectedProject } = useProjectContext()

  return (
    <div className="dash-project-prev">
      <p className="sub-title">Project Overview</p>
      <p className="project-title">{selectedProject?.title}</p>
    </div>
  );
};

export default DashProjectPrev;
