// Project: SkillForge; this is the main page of the application, when no one is logged in!
// it is marked as "page" because it is part of the hero section
// parts could be: NO sidebar (or empty and nice-looking! to keep consistency); in the middle comes the signIn/signUp components;
// possible other parts: a welcome message, a description of the application, a link to the about page, a link to the contact page
// access to admin-section is possible; use of footer more important here?

import Hero from "../components/hero";
import SideBarLeft from "../components/SideBarLeft";

const Home = () => {
  return (
    <div className="home">
      <SideBarLeft />
      <Hero />
    </div>
  );
};

export default Home;
