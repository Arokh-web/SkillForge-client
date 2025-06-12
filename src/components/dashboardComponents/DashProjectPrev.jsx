import { useProjectContext } from "../../contexts/contexts";

const DashProjectPrev = () => {
  const { selectedProject } = useProjectContext();

  return (
    <>
      <div className="dash-project-prev">
        <p className="sub-title">Project Overview</p>
        <p className="project-title">{selectedProject?.title}</p>
        <div className="mt-3">{selectedProject?.content}</div>
        <div className="mt-3">
          <div className="flex justify-around">
            <p>
              <strong>Status:</strong> {selectedProject?.status}
            </p>
            <p>
              <strong>Start Date:</strong> {selectedProject?.createdAt}
            </p>
            <p>
              <strong>End Date:</strong> {selectedProject?.deadline}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashProjectPrev;
