// This is the upper menu bar, where the logo, the title of the current page, dark-mode-switch, logout-button and account-button exist

const Header = () => {
  // const [darkMode, setDarkMode] = useState(false);

  return (
    // HEADER: with logo-container and header-content
    <div className="header-container">
      <div className="logo-container">
        <img src="logo.png" className="logo" />
      </div>
      {/* HEADER CONTENT: with title, dark-mode-switch, logout-button and account-button */}
      <div className="header-content">
        <div className="menubar">
          <div className="title">SkillForge</div>
          <div className="header-buttons">
            <div className="dark-mode-button"></div>
            <div className="logout-button">
              <button className="logout-btn">X</button>
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
