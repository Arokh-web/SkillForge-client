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
          <div className="flex gap-15">
            <p>
              {user?.username
                ? `Welcome ${
                    user.username.charAt(0).toUpperCase() +
                    user.username.slice(1)
                  }!`
                : ""}
            </p>
            <Link to="dashboard">Dashboard</Link>
          </div>
          <div className="header-buttons">
            <div className="">
              {user?.role === "admin" ? (
                <Link to="adminpage">AdminPage</Link>
              ) : null}
            </div>
            <div className="dark-mode-button"></div>
            <div className="logout-button flex flex-wrap group">
              <button
                onClick={handleClickLogout}
                className="h-6 w-6 flex cursor-pointer"
              ></button>
              <p className="flex cursor-pointer font-mono text-xs group opacity-0 group-hover:opacity-100">
                Sign out
              </p>
            </div>
            <div className="group flex flex-wrap account-button">
              <button className="flex account-btn">
                <img
                  src={user?.profile_pic}
                  className="account-icon cursor-pointer "
                />
              </button>
              <p className="flex cursor-pointer font-mono text-xs group opacity-0 group-hover:opacity-100">
                Account
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
