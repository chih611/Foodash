import { Accordion, Col, Form } from "react-bootstrap";
import CustomInput from "../_components/input";
import CustomDropBox from "../_components/dropbox";

const PersonalDetail = ({
  e,
  setSwitchOptions,
  switchOptions,
  textBoxFields,
  personalInfo,
  dropDownFields,
  dateTimeFields,
  readOnlyFields,
  Row,
  statusFetching,
  customHeaderColor,
  handleChange, // New prop
  optionsData,
  setShowSaveBtn,
}) => (
  <>
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header className={customHeaderColor}>
          Personal Infomation
        </Accordion.Header>
        <Accordion.Body>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            {Object.entries(e).map(([key, value], index) => {
              return (
                <>
                  {textBoxFields.includes(key) && personalInfo.includes(key) ? (
                    <Col lg="6" className="mt-3">
                      <CustomInput
                        title={key}
                        value={value}
                        index={index}
                        readOnlyFields={readOnlyFields}
                        dateTimeFields={dateTimeFields}
                        statusFetching={statusFetching}
                        handleChange={handleChange} // Use unified handleChange
                        // setShowSaveBtn={setShowSaveBtn}
                      />
                    </Col>
                  ) : null}
                  {dropDownFields.includes(key) &&
                  personalInfo.includes(key) ? (
                    <Col lg="6" className="mt-3">
                      <CustomDropBox
                        title={key}
                        value={value}
                        index={index}
                        switchOptions={switchOptions}
                        // setSwitchOptions={setSwitchOptions}
                        statusFetching={statusFetching}
                        handleChange={handleChange} // Use unified handleChange
                        optionsData={optionsData}
                      />
                    </Col>
                  ) : null}
                </>
              );
            })}
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </>
);
export default PersonalDetail;
