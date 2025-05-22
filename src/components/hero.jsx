// This is the Main Area of the Application, where the pages are loaded
// selection-logic for all sub-pages will be implemented here depending on login/situation

import SignInUp from "./SignInUp";

const Hero = () => {
  return (
    <div className="hero">
      <div>
        {/* Depending on login, content varies. current try-out: sign-page */}
        {/* Home-Page with SideBar and Hero (pending content) */}
        {/* Sample Text */}
        <h1>Welcome to SkillForge</h1>
        <p>
          Your one-stop solution for skill development and project management.
        </p>
        Join us to enhance your skills and manage your projects efficiently.
        <SignInUp />
        <p>
          <button>Learn More</button>
        </p>
        <div></div>
      </div>
    </div>
  );
};

export default Hero;
