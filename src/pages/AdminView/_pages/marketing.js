import { Tab } from "react-bootstrap";
import React from "react";
import { Container } from "react-bootstrap";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
const ProgramBlock = ({ label }) => {
  return (
    <div className="program-block">
      <div className="program-label">{label}</div>
    </div>
  );
};

const AddProgramBlock = () => {
  return (
    <div className="program-block add-program">
      <LibraryAddIcon className="add-icon" />
    </div>
  );
};

const Section = ({ title, programs, allowScroll }) => {
  return (
    <div className="section">
      <h2 className="section-title">{title}</h2>
      <div className={allowScroll ? "scroll-container" : ""}>
        <div className={allowScroll ? "scrollable-row d-flex" : "row"}>
          {programs.map((program, index) => (
            <div key={index} className="program-wrapper">
              <ProgramBlock label={program} />
            </div>
          ))}
          {allowScroll && (
            <div className="program-wrapper">
              <AddProgramBlock />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const Marketing = (props) => {
  return (
    <>
      <Tab.Pane {...props}>
        <div>
          <h1 className="crm-title">CRM_Program</h1>
          <Container fluid className="marketing-program-container">
            <Section
              title="Permanent"
              programs={[
                "Loyalty",
                "Discount",
                "Rewards",
                "Membership",
                "Coupon",
              ]}
              allowScroll={true} // Enable horizontal scrolling for the Permanent section
            />
            <Section
              title="Occasion"
              programs={[
                "Christmas",
                "Easter",
                "Birthday",
                "Halloween",
                "New Year",
              ]}
              allowScroll={true} // Enable horizontal scrolling for the Occasion section
            />
          </Container>
        </div>
      </Tab.Pane>
    </>
  );
};

export default Marketing;
