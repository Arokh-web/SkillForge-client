// Project: SkillForge; this is the main page of the application, when no one is logged in!
// it is marked as "page" because it is part of the hero section
// parts could be: NO sidebar (or empty and nice-looking! to keep consistency); in the middle comes the signIn/signUp components;
// possible other parts: a welcome message, a description of the application, a link to the about page, a link to the contact page
// access to admin-section is possible; use of footer more important here?

import SideBarLeft from "../components/sideBarComponents/SideBarLeft";
import { useAuthContext } from "../contexts/contexts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Home = () => {

  return (
    <div className="home">
      <Header />
      <div className="hero-sidebar-placement">
        <SideBarLeft />
        <div className="hero hero-fade-mask">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
      {/* Footer is included here, so it is always visible */}
      {/* The footer contains the links to the about page, the contact page, the privacy policy and the terms of service */}
      {/* The footer also contains the copyright notice */}
    </div>
  );
};

export default Home;
