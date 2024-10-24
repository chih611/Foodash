import { Accordion, Col, Form } from "react-bootstrap";
import CustomInput from "../_components/input";
import CustomDropBox from "../_components/dropbox";

const OrderInformation = ({
  e,
  switchOptions,
  setSwitchOptions,
  textBoxFields,
  personalInfo,
  dropDownFields,
  dateTimeFields,
  readOnlyFields,
  setShowSaveBtn,
  Row,
  statusFetching,
  customOrderInformationColor,
  handleChange, // New prop
}) => (
  <>
    <Accordion defaultActiveKey={["0"]} alwaysOpen className="mt-3">
      <Accordion.Item eventKey="0">
        <Accordion.Header className={customOrderInformationColor}>
          Order Infomation
        </Accordion.Header>
        <Accordion.Body>
          <Form.Group as={Row} className="" controlId="formPlaintextEmail">
            {Object.entries(e).map(([key, value], index) => {
              return (
                <>
                  {textBoxFields.includes(key) &&
                  !personalInfo.includes(key) ? (
                    <Col lg="6" className="mt-3">
                      <CustomInput
                        title={key}
                        value={value}
                        index={index}
                        readOnlyFields={readOnlyFields}
                        dateTimeFields={dateTimeFields}
                        statusFetching={statusFetching}
                        handleChange={handleChange} // Use unified handleChange
                      />
                    </Col>
                  ) : null}
                  {dropDownFields.includes(key) &&
                  !personalInfo.includes(key) ? (
                    <Col lg="6" className="mt-3">
                      <CustomDropBox
                        title={key}
                        value={value}
                        index={index}
                        setSwitchOptions={setSwitchOptions}
                        switchOptions={switchOptions}
                        statusFetching={statusFetching}
                        handleChange={handleChange} // Use unified handleChange
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

export default OrderInformation;
