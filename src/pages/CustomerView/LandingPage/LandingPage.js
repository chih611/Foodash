import React from "react";
import LandingAbout from "./LandingAbout/LandingAbout";
import LandingContact from "./LandingContact/LandingContact";
import LandingGallery from "./LandingGallery/LandingGallery";
import LandingMenu from "./LandingMenu/LandingMenu";
import LandingNavBar from "./LandingNavBar/LandingNavBar";

const LandingPage = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <LandingNavBar />
      <LandingAbout />
      <LandingMenu />
      <LandingGallery />
      <LandingContact />
    </div>
  );
};

export default LandingPage;
