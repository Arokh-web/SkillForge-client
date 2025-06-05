// This is the Main Area of the Application, where the pages are loaded
// selection-logic for all sub-pages will be implemented here depending on login/situation

import { Outlet } from "react-router-dom";
import SignInUp from "../SignComponents/SignInUp.jsx";

const Hero = () => {
  return (
    <div className="hero hero-fade-mask">
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Hero;
