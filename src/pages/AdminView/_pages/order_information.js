import { Accordion, Col, Form } from "react-bootstrap";
import { CustomInput } from "../_components/input";
import { CustomDropBox } from "../_components/dropbox";

export const OrderInformation = ({
  e,
  status,
  setStatus,
  textBoxFields,
  personalInfo,
  dropDownFields,
  dateTimeFields,
  readOnlyFields,
  setShowSaveBtn,
  Row,
}) => (
  <>
    <Accordion defaultActiveKey={["0"]} alwaysOpen className="mt-3">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Order Infomation</Accordion.Header>
        <Accordion.Body>
          <Form.Group as={Row} className="" controlId="formPlaintextEmail">
            {Object.entries(e).map(([key, value], index) => {
              return (
                <>
                  {textBoxFields.includes(key) &&
                  !personalInfo.includes(key) ? (
                    <Col lg="6" className="mt-3">
                      <CustomInput
                        keyInput={key}
                        value={value}
                        index={index}
                        readOnlyFields={readOnlyFields}
                        dateTimeFields={dateTimeFields}
                      />
                    </Col>
                  ) : null}
                  {dropDownFields.includes(key) &&
                  !personalInfo.includes(key) ? (
                    <Col lg="6" className="mt-3">
                      <CustomDropBox
                        keyDropbox={key}
                        value={value}
                        index={index}
                        setStatus={setStatus}
                        status={status}
                        setShowSaveBtn={setShowSaveBtn}
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
