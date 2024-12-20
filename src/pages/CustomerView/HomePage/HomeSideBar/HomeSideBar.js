import React from "react";
import HomeSideBarBox from "./HomeSideBarBox";

const HomeSideBar = ({ onFilterChange }) => {
  return (
    <div className="home-sidebar">
      <div className="home-sidebar-container">
        <div className="home-sidebar-item">
          <h4>Customization</h4>
        </div>
        <div className="home-sidebar-box">
          <HomeSideBarBox onFilterChange={onFilterChange} />
        </div>
      </div>
    </div>
  );
};

export default HomeSideBar;
