import React from "react";
import HomeSideBarBox from "./HomeSideBarBox";

const HomeSideBar = () => {
  return (
    <div className="home-sidebar">
      <div className="home-sidebar-container">
        <div className="home-sidebar-item">
          <h3>Customization ?</h3>
        </div>
        <div className="home-sidebar-box">
          <HomeSideBarBox />
        </div>
      </div>
    </div>
  );
};

export default HomeSideBar;
