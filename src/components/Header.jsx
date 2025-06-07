// This is the upper menu bar, where the logo, the title of the current page, dark-mode-switch, logout-button and account-button exist
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/contexts";
import { useNavigate } from "react-router-dom";
import fetchData from "../API/fetchData";

const Header = () => {
  // const [darkMode, setDarkMode] = useState(false);
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleClickLogout = async () => {
    await fetchData("POST", "/auth/signout");
    // Clear user state and navigate to signinup page
    setUser(null);
    navigate("signinup");
  };

  return (
    // HEADER: with logo-container and header-content
    <div className="header-container">
      <div className="logo-container">
        <img src="logo.png" className="logo" />
      </div>
      {/* HEADER CONTENT: with title, dark-mode-switch, logout-button and account-button */}
      <div className="header-content">
        <div className="menubar">
          <div className="title">
            <Link to="/">SkillForge</Link>
          </div>
          <div>
            <p>{user?.username ? `Welcome ${user.username}` : ""}</p>
          </div>
          <div className="header-buttons">
            <div className="justify-left">
              <Link to="dashboard">Go to Dashboard (Overview)</Link>
              <Link to="projects">Projects</Link>
              <Link to="tasks">Tasks</Link>
              {user?.role === "admin" ? (
                <Link to="adminpage">AdminPage</Link>
              ) : null}
            </div>
            <div className="dark-mode-button"></div>
            <div className="logout-button">
              <button className="logout-btn" onClick={handleClickLogout}>
                X
              </button>
            </div>
            <div className="account-button">
              <button className="account-btn">
                <img src="account.png" className="account-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
