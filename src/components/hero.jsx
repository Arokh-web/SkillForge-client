// This is the Main Area of the Application, where the pages are loaded
// selection-logic for all sub-pages will be implemented here depending on login/situation

import Projects from "../pages/Projects";

const Hero = () => {
  return (
    <div>
      {/* Sample Text */}
      <h1>Welcome to SkillForge</h1>
      <p>
        Your one-stop solution for skill development and project management.
      </p>
      <button>Get Started</button>
      <button>Learn More</button>
      <div>
        {/* Depending on login, content varies. initial try-out: projects-page */}
        
        <Projects />
      </div>
    </div>
  );
};

export default Hero;
