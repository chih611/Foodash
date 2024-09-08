import React from "react";
import LandingNavBar from "./LandingNavBar/LandingNavBar";
import LandingMenu from "./LandingMenu/LandingMenu";

const LandingPage = () => {
  return (
    <div className="landing-menu">
      <LandingNavBar />
      <LandingMenu />
    </div>
  );
};

export default LandingPage;
